use std::{env, fs};

use zed::settings::LspSettings;
use zed_extension_api::{self as zed, LanguageServerId, Result};

const BINARY_NAME: &str = "dependi-language-server";
const SERVER_FILENAME: &str = "dependi-language-server.js";
const SERVER_JS: &[u8] = include_bytes!(concat!(
    env!("CARGO_MANIFEST_DIR"),
    "/bin/dependi-language-server.js"
));

struct DependiExtension {
    cached_server_path: Option<String>,
}

impl DependiExtension {
    fn ensure_language_server() -> Result<String> {
        fs::write(SERVER_FILENAME, SERVER_JS)
            .map_err(|e| format!("failed to write language server: {e}"))?;

        env::current_dir()
            .map_err(|e| format!("failed to resolve extension directory: {e}"))?
            .join(SERVER_FILENAME)
            .into_os_string()
            .into_string()
            .map_err(|_| "language server path is not valid UTF-8".into())
    }
}

impl zed::Extension for DependiExtension {
    fn new() -> Self {
        Self {
            cached_server_path: None,
        }
    }

    fn language_server_command(
        &mut self,
        _language_server_id: &LanguageServerId,
        worktree: &zed::Worktree,
    ) -> Result<zed::Command> {
        if let Some(path) = worktree.which(BINARY_NAME) {
            return Ok(zed::Command {
                command: path,
                args: vec!["--stdio".to_string()],
                env: Default::default(),
            });
        }

        let server_path = match &self.cached_server_path {
            Some(path) if fs::metadata(path).is_ok_and(|stat| stat.is_file()) => path.clone(),
            _ => {
                let path = Self::ensure_language_server()?;
                self.cached_server_path = Some(path.clone());
                path
            }
        };

        Ok(zed::Command {
            command: zed::node_binary_path()?,
            args: vec![server_path, "--stdio".to_string()],
            env: Default::default(),
        })
    }

    fn language_server_workspace_configuration(
        &mut self,
        language_server_id: &LanguageServerId,
        worktree: &zed::Worktree,
    ) -> Result<Option<zed::serde_json::Value>> {
        let settings = LspSettings::for_worktree(language_server_id.as_ref(), worktree)
            .ok()
            .and_then(|lsp_settings| lsp_settings.settings);
        Ok(settings)
    }
}

zed::register_extension!(DependiExtension);
