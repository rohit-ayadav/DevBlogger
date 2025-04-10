import fs from 'fs/promises';
import path from 'path';
// import puppeteer from 'puppeteer';
import { marked } from 'marked';
// import chromium from 'chrome-aws-lambda';
import puppeteer from 'puppeteer-core';


/**
 * Generates a PDF from a Markdown file
 * @param filename - Markdown filename without extension
 * @param directory -import { NextRequest, NextResponse } from 'next/server';
 Directory containing the markdown file
 * @returns Buffer containing the PDF data
 */
const generatePDF = async (filename: string, directory: string = 'content/cheatsheets'): Promise<Buffer> => {
    const filePath = path.join(process.cwd(), directory, `${filename}.md`);
    const markdownContent = await fs.readFile(filePath, 'utf-8');

    // Configure marked for better code block handling
    const renderer = new marked.Renderer();
    renderer.code = ({ text, lang }) => {
        return `<pre><code class="hljs ${lang}">${text}</code></pre>`;
    };

    marked.use({ renderer });

    // Convert markdown to HTML
    const htmlContent = marked.parse(markdownContent);

    // Format the current date for the footer
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Create a full HTML document with styling and headers/footers for PDF
    const fullHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title> Cheat Sheet - ${filename.toLocaleUpperCase()}</title>
      <style>
        @media print {
          @page {
            size: A4;
            margin: 20mm 15mm 20mm 15mm;
          }
        }
        
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
          background-color: #ffffff;
          counter-reset: page;
        }
        
        .page-header {
          position: fixed;
          top: -10mm;
          left: 0;
          right: 0;
          height: 15mm;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #ddd;
          padding-bottom: 5mm;
        }
        
        .page-header-left {
          display: flex;
          align-items: center;
        }
        
        .page-footer {
          position: fixed;
          bottom: -15mm;
          left: 0;
          right: 0;
          height: 10mm;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 9pt;
          color: #666;
          border-top: 1px solid #ddd;
          padding-top: 3mm;
        }
        
        .page-number::after {
          counter-increment: page;
          content: "Page " counter(page);
        }
        
        .container {
          margin: 5mm 0 10mm 0;
          background-color: white;
        }
        
        .header {
          display: flex;
          align-items: center;
          border-bottom: 2px solid #3498db;
          padding-bottom: 10px;
          margin-bottom: 20px;
        }
        
        .logo {
          width: 40px;
          height: 40px;
        }
        
        .title {
          margin-left: 15px;
          color: #3498db;
          font-size: 24px;
          font-weight: bold;
        }
        
        h1, h2, h3, h4, h5, h6 {
          color: #2c3e50;
        }
        
        h1 {
          font-size: 28px;
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
        }
        
        h2 {
          font-size: 24px;
          margin-top: 30px;
          color: #3498db;
        }
        
        h3 {
          font-size: 20px;
          color: #2980b9;
        }
        
        code {
          font-family: 'Courier New', Courier, monospace;
          background-color: #f7f9fb;
          padding: 2px 5px;
          border-radius: 3px;
          border: 1px solid #e1e4e8;
          color: #e74c3c;
        }
        
        pre {
          background-color: #282c34;
          padding: 15px;
          border-radius: 5px;
          overflow-x: auto;
          margin: 15px 0;
          border: 1px solid #ddd;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        pre code {
          color: #f8f8f2;
          background-color: transparent;
          padding: 0;
          border: none;
          font-size: 14px;
          line-height: 1.5;
          display: block;
        }
        
        /* Syntax highlighting colors */
        .hljs-keyword { color: #ff79c6; }
        .hljs-string { color: #f1fa8c; }
        .hljs-comment { color: #6272a4; }
        .hljs-function { color: #50fa7b; }
        .hljs-number { color: #bd93f9; }
        .hljs-operator { color: #ff79c6; }
        .hljs-class { color: #8be9fd; }
        
        a {
          color: #3498db;
          text-decoration: none;
        }
        
        a:hover {
          text-decoration: underline;
        }
        
        blockquote {
          border-left: 4px solid #3498db;
          padding-left: 15px;
          margin-left: 0;
          color: #666;
          background-color: #f9f9f9;
          padding: 10px 15px;
        }
        
        img {
          max-width: 100%;
          border-radius: 5px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        table {
          border-collapse: collapse;
          width: 100%;
          margin: 20px 0;
          box-shadow: 0 2px 3px rgba(0,0,0,0.1);
        }
        
        table, th, td {
          border: 1px solid #ddd;
        }
        
        th, td {
          padding: 12px;
          text-align: left;
        }
        
        th {
          background-color: #3498db;
          color: white;
          font-weight: bold;
        }
        
        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        
        tr:hover {
          background-color: #f1f1f1;
        }
        
        .footer {
          margin-top: 40px;
          text-align: center;
          color: #777;
          font-size: 14px;
          border-top: 1px solid #eee;
          padding-top: 20px;
        }
      </style>
    </head>
    <body>
      <!-- Header that appears on every page -->
      <div class="page-header">
        <div class="page-header-left">
          <svg class="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="30" height="30">
            <circle cx="50" cy="50" r="45" fill="#3498db" />
            <text x="50" y="65" text-anchor="middle" fill="white" font-size="50">D</text>
          </svg>
          <span style="margin-left: 10px; font-weight: bold; color: #3498db;">DevBlogger</span>
        </div>
        <div class="page-header-right">
          <span style="font-size: 9pt;">devblogger.in</span>
        </div>
      </div>
      
      <!-- Footer that appears on every page -->
      <div class="page-footer">
        <div>DevBlogger © ${new Date().getFullYear()} | ${`Cheatsheet - ${filename}`}</div>
        <div class="page-number"></div>
      </div>
      
      <div class="container">
        <div class="header">
          <svg class="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="#3498db" />
            <text x="50" y="65" text-anchor="middle" fill="white" font-size="50">D</text>
          </svg>
          <div class="title">DevBlogger</div>
        </div>
        
        ${htmlContent}
        
        <div class="footer">
          Generated from ${filename}.md | DevBlogger © ${new Date().getFullYear()}
        </div>
      </div>
    </body>
    </html>
        `;

    // Launch puppeteer to generate PDF
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'] // Helpful for deployment environments
    });

  // const browser = await puppeteer.launch({
  //   args: chromium.args,
  //   defaultViewport: chromium.defaultViewport,
  //   executablePath: await chromium.executablePath,
  //   headless: chromium.headless,
  // });

    const page = await browser.newPage();

    // Set content directly instead of loading from file
    await page.setContent(fullHtml, { waitUntil: 'networkidle0' });

    // Wait for JavaScript to execute (for syntax highlighting)
    await page.evaluateHandle('document.fonts.ready');
    await new Promise(resolve => setTimeout(resolve, 500)); // Give a little time for JS to execute

    // Generate PDF as buffer with more PDF-specific options
    const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        displayHeaderFooter: false, // We're using our own headers and footers
        margin: {
            top: '25mm',
            right: '15mm',
            bottom: '25mm',
            left: '15mm'
        }
    });

    // Close the browser
    await browser.close();

    return Buffer.from(pdfBuffer);
}

export default generatePDF;