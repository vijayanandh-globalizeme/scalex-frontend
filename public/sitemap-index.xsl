<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:sm="http://www.sitemaps.org/schemas/sitemap/0.9">
<xsl:output method="html" encoding="UTF-8" indent="yes"/>
<xsl:template match="/">
<html lang="en">
<head>
  <title>XML Sitemap Index</title>
  <meta charset="UTF-8"/>
  <style>
    body { font-family: -apple-system, Segoe UI, Roboto, Arial, sans-serif; margin: 2rem; color: #222; background: #fff; }
    h1 { font-size: 1.4rem; margin-bottom: .25rem; }
    p.desc { color: #666; margin-top: 0; }
    table { border-collapse: collapse; width: 100%; margin-top: 1.5rem; }
    th { text-align: left; background: #f5f5f5; border-bottom: 2px solid #ddd; padding: .6rem .8rem; font-size: .85rem; text-transform: uppercase; letter-spacing: .03em; color: #555; }
    td { padding: .6rem .8rem; border-bottom: 1px solid #eee; font-size: .95rem; }
    tr:hover td { background: #fafafa; }
    a { color: #2563eb; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .count { color: #888; font-size: .85rem; }
  </style>
</head>
<body>
  <h1>XML Sitemap Index</h1>
  <p class="desc">This index lists <xsl:value-of select="count(sm:sitemapindex/sm:sitemap)"/> sitemap(s). Click any URL below to view its contents.</p>
  <table>
    <tr>
      <th>Sitemap</th>
      <th>Last Modified</th>
    </tr>
    <xsl:for-each select="sm:sitemapindex/sm:sitemap">
    <tr>
      <td><a href="{sm:loc}"><xsl:value-of select="sm:loc"/></a></td>
      <td><xsl:value-of select="sm:lastmod"/></td>
    </tr>
    </xsl:for-each>
  </table>
</body>
</html>
</xsl:template>
</xsl:stylesheet>
