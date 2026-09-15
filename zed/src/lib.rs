use std::fs;

use zed::settings::LspSettings;
use zed_extension_api::{
    self as zed, DownloadedFileType, LanguageServerId, LanguageServerInstallationStatus, Result,
};

const BINARY_NAME: &str = "dependi-language-server";
const SERVER_FILENAME: &str = "dependi-language-server.js";
const VERSION: &str = env!("CARGO_PKG_VERSION");

struct DependiExtension {
    cached_server_path: Option<String>,
}

impl DependiExtension {
    fn server_download_url() -> String {
        // Language server is not bundled (Zed publishing prerequisite). It is
        // downloaded from the tagged release tree that matches this extension version.
        format!(
            "https://raw.githubusercontent.com/filllabs/dependi/v{VERSION}/zed/bin/{SERVER_FILENAME}"
        )
    }

    fn ensure_language_server(&mut self, language_server_id: &LanguageServerId) -> Result<String> {
        let server_path = SERVER_FILENAME.to_string();
        if fs::metadata(&server_path).is_ok_and(|stat| stat.is_file()) {
            return Ok(server_path);
        }

        zed::set_language_server_installation_status(
            language_server_id,
            &LanguageServerInstallationStatus::Downloading,
        );

        let url = Self::server_download_url();
        zed::download_file(&url, &server_path, DownloadedFileType::Uncompressed)
            .map_err(|e| format!("failed to download language server from {url}: {e}"))?;

        if !fs::metadata(&server_path).is_ok_and(|stat| stat.is_file()) {
            return Err(format!(
                "downloaded language server missing at {server_path}"
            ));
        }

        Ok(server_path)
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
        language_server_id: &LanguageServerId,
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
                let path = self.ensure_language_server(language_server_id)?;
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

    fn language_server_initialization_options(
        &mut self,
        language_server_id: &LanguageServerId,
        worktree: &zed::Worktree,
    ) -> Result<Option<zed::serde_json::Value>> {
        // Prefer explicit initialization_options; fall back to settings so
        // `lsp.dependi.settings` works without a second key.
        let lsp = LspSettings::for_worktree(language_server_id.as_ref(), worktree).ok();
        Ok(lsp.and_then(|s| s.initialization_options.or(s.settings)))
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
