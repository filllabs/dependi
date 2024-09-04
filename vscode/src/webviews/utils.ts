export function markdownToHTML(markdown: string): string {
  // Convert images to HTML
  let html = markdown.replace(
    /!\[([^\]]+)\]\(([^)]+)\)/g,
    '<img src="$2" alt="$1">'
  );

  // Convert links to HTML
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Convert headings to HTML"
  html = html.replace(/^#\s(.*)$/gm, "<h1>$1</h1>");
  html = html.replace(/^##\s(.*)$/gm, "<h2>$1</h2>");
  html = html.replace(/^###\s(.*)$/gm, "<h4>$1</h4>");

  // replace bullet points
  html = html.replace(/^\s*-\s(.*)$/gm, "<li>$1</li>");
  html = html.replace(/<li>(.*)<\/li>/g, "<ul>$&</ul>");
  return html;
}
