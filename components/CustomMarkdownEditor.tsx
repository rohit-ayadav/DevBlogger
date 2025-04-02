import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    Bold, Italic, Strikethrough, Code, Heading1, Heading2, Heading3,
    List, ListOrdered, Quote, Minus, FileCode, Link, Image, CheckSquare,
    Table2, Maximize2, Moon, Sun, Columns, FileJson, Eye, Edit, X
} from 'lucide-react';

// Default toolbar configuration
const DEFAULT_TOOLBAR = [
    { id: 'bold', icon: Bold, title: 'Bold', group: 'format' },
    { id: 'italic', icon: Italic, title: 'Italic', group: 'format' },
    { id: 'strikethrough', icon: Strikethrough, title: 'Strikethrough', group: 'format' },
    { id: 'code', icon: Code, title: 'Inline Code', group: 'format' },
    { id: 'h1', icon: Heading1, title: 'Heading 1', group: 'headings' },
    { id: 'h2', icon: Heading2, title: 'Heading 2', group: 'headings' },
    { id: 'h3', icon: Heading3, title: 'Heading 3', group: 'headings' },
    { id: 'bulletList', icon: List, title: 'Bullet List', group: 'lists' },
    { id: 'numberedList', icon: ListOrdered, title: 'Numbered List', group: 'lists' },
    { id: 'blockquote', icon: Quote, title: 'Blockquote', group: 'blocks' },
    { id: 'horizontalRule', icon: Minus, title: 'Horizontal Line', group: 'blocks' },
    { id: 'codeBlock', icon: FileCode, title: 'Code Block', group: 'blocks' },
    { id: 'link', icon: Link, title: 'Link', group: 'inserts' },
    { id: 'image', icon: Image, title: 'Image', group: 'inserts' },
    { id: 'taskList', icon: CheckSquare, title: 'Task List', group: 'inserts' },
    { id: 'table', icon: Table2, title: 'Table', group: 'inserts' },
    { id: 'preview', icon: Eye, title: 'Preview', group: 'view' },
    { id: 'edit', icon: Edit, title: 'Edit', group: 'view', hideInToolbar: true },
    { id: 'darkMode', icon: Moon, altIcon: Sun, title: 'Toggle Dark Mode', group: 'view' },
    { id: 'splitView', icon: Columns, title: 'Split View', group: 'view' },
    { id: 'outputFormat', icon: FileJson, title: 'Output Format', group: 'view' }
];

// A more comprehensive markdown to HTML converter
const markdownToHtml = (markdown: string): string => {
    if (!markdown) return '';

    let html = markdown;

    // Escape HTML characters
    html = html.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    // Process code blocks with language
    html = html.replace(/```([a-z]*)\n([\s\S]*?)\n```/g, (match: string, language: string, code: string): string => {
        return `<pre class="language-${language || 'text'}"><code>${code}</code></pre>`;
    });

    // Headers - need to process before other inline formatting
    html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');

    // Bold, italic, strikethrough
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/~~(.*?)~~/g, '<del>$1</del>');

    // Inline code (after other inline formatting)
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Links and images
    html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto">');
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

    // Lists - handle nested with proper HTML
    let inList = false;
    let listType = '';

    // Process lists line by line
    const lines = html.split('\n');
    for (let i = 0; i < lines.length; i++) {
        // Bullet list
        if (lines[i].match(/^\* (.*?)$/)) {
            if (!inList || listType !== 'ul') {
                lines[i] = inList ? '</ol><ul><li>' + lines[i].replace(/^\* (.*)$/, '$1') + '</li>' : '<ul><li>' + lines[i].replace(/^\* (.*)$/, '$1') + '</li>';
                inList = true;
                listType = 'ul';
            } else {
                lines[i] = '<li>' + lines[i].replace(/^\* (.*)$/, '$1') + '</li>';
            }
        }
        // Numbered list
        else if (lines[i].match(/^\d+\. (.*?)$/)) {
            if (!inList || listType !== 'ol') {
                lines[i] = inList ? '</ul><ol><li>' + lines[i].replace(/^\d+\. (.*)$/, '$1') + '</li>' : '<ol><li>' + lines[i].replace(/^\d+\. (.*)$/, '$1') + '</li>';
                inList = true;
                listType = 'ol';
            } else {
                lines[i] = '<li>' + lines[i].replace(/^\d+\. (.*)$/, '$1') + '</li>';
            }
        }
        // Close list if next line is not a list item
        else if (inList) {
            lines[i] = listType === 'ul' ? '</ul>' + lines[i] : '</ol>' + lines[i];
            inList = false;
        }
    }

    // Close any open list at the end
    if (inList) {
        lines.push(listType === 'ul' ? '</ul>' : '</ol>');
    }

    html = lines.join('\n');

    // Blockquotes
    html = html.replace(/^&gt; (.*?)$/gm, '<blockquote>$1</blockquote>');
    html = html.replace(/<\/blockquote>\n<blockquote>/g, '<br>');

    // Horizontal rule
    html = html.replace(/^---$/gm, '<hr>');

    // Task lists
    html = html.replace(/- \[ \] (.*?)$/gm, '<div class="flex items-center my-1"><input type="checkbox" disabled class="mr-2"> <span>$1</span></div>');
    html = html.replace(/- \[x\] (.*?)$/gm, '<div class="flex items-center my-1"><input type="checkbox" checked disabled class="mr-2"> <span>$1</span></div>');

    // Tables
    const tableRegex = /\|(.+)\|\n\|([-:\|]+)\|\n((?:\|.+\|\n?)+)/g;
    html = html.replace(tableRegex, (match: string, headers: string, alignment: string, rows: string): string => {
        const headerCells: string[] = headers.split('|').map((h) => h.trim()).filter(Boolean);
        const alignmentCells: string[] = alignment.split('|').map((a) => a.trim()).filter(Boolean);

        let tableHtml: string = '<table class="border-collapse w-full my-4"><thead><tr>';

        // Headers
        headerCells.forEach((cell: string, idx: number) => {
            let align: string = 'left';
            if (idx < alignmentCells.length) {
                if (alignmentCells[idx].startsWith(':') && alignmentCells[idx].endsWith(':')) align = 'center';
                else if (alignmentCells[idx].endsWith(':')) align = 'right';
            }
            tableHtml += `<th class="border border-gray-300 px-4 py-2 text-${align}">${cell}</th>`;
        });

        tableHtml += '</tr></thead><tbody>';

        // Rows
        const rowsArray: string[] = rows.split('\n').filter((row) => row.includes('|'));
        rowsArray.forEach((row: string) => {
            const cells: string[] = row.split('|').map((c) => c.trim()).filter(Boolean);
            tableHtml += '<tr>';
            cells.forEach((cell: string, idx: number) => {
                let align: string = 'left';
                if (idx < alignmentCells.length) {
                    if (alignmentCells[idx].startsWith(':') && alignmentCells[idx].endsWith(':')) align = 'center';
                    else if (alignmentCells[idx].endsWith(':')) align = 'right';
                }
                tableHtml += `<td class="border border-gray-300 px-4 py-2 text-${align}">${cell}</td>`;
            });
            tableHtml += '</tr>';
        });

        tableHtml += '</tbody></table>';
        return tableHtml;
    });

    // Paragraphs - preserve line breaks but group paragraph text
    let paragraphs = html.split('\n\n');
    for (let i = 0; i < paragraphs.length; i++) {
        if (!paragraphs[i].startsWith('<') && paragraphs[i].trim() !== '') {
            paragraphs[i] = '<p>' + paragraphs[i].replace(/\n/g, '<br>') + '</p>';
        }
    }

    return paragraphs.join('\n\n');
};

const CustomMarkdownEditor = ({
    initialValue = '# Welcome to the Markdown Editor\n\nStart typing here...',
    placeholder = 'Type your markdown here...',
    onChange = (value: string) => { },
    height = 'auto',
    minHeight = '400px',
    darkModeDefault = false,
    toggleDarkMode = (darkMode: boolean) => { },
    readOnly = false,
    toolbarConfig = DEFAULT_TOOLBAR,
    defaultView = 'edit', // 'edit', 'preview', 'split'
    defaultOutputFormat = 'markdown', // 'markdown', 'html'
    className = '',
    previewClassName = '',
    toolbarClassName = '',
    editorClassName = '',
    outputAreaClassName = ''
}) => {
    const [markdown, setMarkdown] = useState(initialValue);
    const [html, setHtml] = useState('');
    const [viewMode, setViewMode] = useState(defaultView);
    const [darkMode, setDarkMode] = useState(darkModeDefault);
    const [output, setOutput] = useState(defaultOutputFormat);
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Check for mobile viewport on mount and resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
            // If mobile and split view, switch to edit view
            if (window.innerWidth < 768 && viewMode === 'split') {
                setViewMode('edit');
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, [viewMode]);

    // Adjust textarea height to fit content
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.max(textareaRef.current.scrollHeight, 200)}px`;
        }
    }, [markdown]);

    // Generate toolbar items from config
    const toolbarItems = toolbarConfig.filter(item => !item.hideInToolbar);

    // Group toolbar items by their group property
    const toolbarGroups = toolbarItems.reduce<Record<string, typeof toolbarItems>>((groups, item) => {
        const group = item.group || 'default';
        return { ...groups, [group]: [...(groups[group] || []), item] };
    }, {});

    // Convert markdown to HTML for preview
    useEffect(() => {
        setHtml(markdownToHtml(markdown));
        onChange(markdown);
    }, [markdown, onChange]);

    // Functions for toolbar actions
    const insertText = useCallback((before: string, after = '') => {
        if (readOnly) return;

        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = markdown.substring(start, end);
        const newText = markdown.substring(0, start) + before + selectedText + after + markdown.substring(end);
        setMarkdown(newText);

        // Focus back on textarea and set cursor position
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(
                start + before.length,
                end + before.length + (selectedText.length > 0 ? selectedText.length : 0)
            );
        }, 0);
    }, [markdown, readOnly]);

    // Handle toolbar actions
    const handleToolbarAction = useCallback((itemId: string) => {
        switch (itemId) {
            case 'bold':
                insertText('**', '**');
                break;
            case 'italic':
                insertText('*', '*');
                break;
            case 'strikethrough':
                insertText('~~', '~~');
                break;
            case 'code':
                insertText('`', '`');
                break;
            case 'h1':
                insertText('# ');
                break;
            case 'h2':
                insertText('## ');
                break;
            case 'h3':
                insertText('### ');
                break;
            case 'bulletList':
                insertText('* ');
                break;
            case 'numberedList':
                insertText('1. ');
                break;
            case 'blockquote':
                insertText('> ');
                break;
            case 'horizontalRule':
                insertText('---\n');
                break;
            case 'codeBlock':
                insertText('```\n', '\n```');
                break;
            case 'link':
                insertText('[', '](https://)');
                break;
            case 'image':
                insertText('![alt text](', ')');
                break;
            case 'taskList':
                insertText('- [ ] ');
                break;
            case 'table':
                insertText('| Header | Header |\n| ------ | ------ |\n| Cell   | Cell   |\n');
                break;
            case 'preview':
                setViewMode(viewMode === 'preview' ? 'edit' : 'preview');
                break;
            case 'edit':
                setViewMode('edit');
                break;
            case 'darkMode':
                setDarkMode(!darkMode);
                break;
            case 'splitView':
                // Prevent split view on mobile
                if (isMobile) {
                    setViewMode('edit');
                } else {
                    setViewMode(viewMode === 'split' ? 'edit' : 'split');
                }
                break;
            case 'outputFormat':
                setOutput(output === 'markdown' ? 'html' : 'markdown');
                break;
            default:
                break;
        }
    }, [insertText, viewMode, darkMode, output, isMobile]);

    // Custom styles based on dark mode
    const styles = {
        container: `${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'} flex flex-col ${className}`,
        toolbar: `flex flex-wrap items-center p-2 border-b gap-1 sticky top-0 z-10 ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-white'} ${toolbarClassName}`,
        toolbarGroup: `flex items-center mr-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`,
        toolbarButton: `p-2 rounded text-center flex items-center justify-center ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-200 text-gray-700'}`,
        activeButton: `${darkMode ? 'bg-gray-700 text-blue-400' : 'bg-blue-100 text-blue-700'}`,
        textArea: `w-full p-4 font-mono resize-none outline-none ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'} ${editorClassName}`,
        preview: `p-6 overflow-auto prose ${darkMode ? 'prose-invert bg-gray-800' : 'bg-white'} max-w-none ${previewClassName}`,
        outputArea: `p-3 border-t mt-auto ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-white'} ${outputAreaClassName}`,
        outputButton: `text-xs px-3 py-1 mr-1 rounded`,
        outputTextarea: `w-full p-2 font-mono text-xs resize-none rounded ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'}`
    };

    // Determine what view components to show
    const showEditor = viewMode === 'edit' || viewMode === 'split';
    const showPreview = viewMode === 'preview' || viewMode === 'split';

    return (
        <div
            ref={containerRef}
            className={styles.container}
            style={{
                height,
                minHeight
            }}
        >
            {/* Toolbar */}
            <div className={styles.toolbar}>
                {Object.entries(toolbarGroups).map(([groupName, items]) => (
                    <div key={groupName} className={styles.toolbarGroup}>
                        {items.map((item) => {
                            const Icon = item.icon;
                            const AltIcon = item.altIcon;

                            // Special case for dark mode toggle which has two icons
                            const displayIcon = item.id === 'darkMode' && darkMode && AltIcon ? <AltIcon size={16} /> : <Icon size={16} />;

                            // Determine active state for view buttons
                            let isActive = false;
                            if (item.id === 'preview' && viewMode === 'preview') isActive = true;
                            if (item.id === 'splitView' && viewMode === 'split') isActive = true;
                            if (item.id === 'outputFormat' && output === 'html') isActive = true;

                            // Hide split view button on mobile
                            if (item.id === 'splitView' && isMobile) {
                                return null;
                            }

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => handleToolbarAction(item.id)}
                                    className={`${styles.toolbarButton} ${isActive ? styles.activeButton : ''}`}
                                    title={item.title}
                                    disabled={readOnly && !['preview', 'darkMode', 'splitView', 'outputFormat'].includes(item.id)}
                                >
                                    {displayIcon}
                                </button>
                            );
                        })}
                        <div className="mx-1 h-6 border-r border-gray-300 dark:border-gray-700" />
                    </div>
                ))}

                <span className="ml-auto text-sm font-medium">
                    {output === 'markdown' ? 'Markdown' : 'HTML'} Output
                </span>
            </div>

            {/* Editor Area - Flex-grow to take available space */}
            <div className="flex flex-1 overflow-hidden">
                {showEditor && (
                    <div className={`${viewMode === 'split' ? 'w-1/2 border-r' : 'w-full'} flex flex-col ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                        <textarea
                            ref={textareaRef}
                            id="markdown-textarea"
                            value={markdown}
                            onChange={(e) => setMarkdown(e.target.value)}
                            className={styles.textArea}
                            placeholder={placeholder}
                            readOnly={readOnly}
                            style={{ minHeight: '200px' }}
                        />
                    </div>
                )}

                {showPreview && (
                    <div className={`${viewMode === 'split' ? 'w-1/2' : 'w-full'} overflow-auto relative`}>
                        {viewMode === 'preview' && (
                            <button
                                onClick={() => setViewMode('edit')}
                                className="absolute top-2 right-2 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 z-10"
                                title="Return to editor"
                            >
                                <X size={16} />
                            </button>
                        )}
                        <div
                            className={styles.preview}
                            dangerouslySetInnerHTML={{ __html: html }}
                        />
                    </div>
                )}
            </div>

            {/* Output Area */}
            <div className={styles.outputArea}>
                <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold">Output:</span>
                    <div className="flex">
                        <button
                            className={`${styles.outputButton} ${output === 'markdown' ? 'bg-blue-500 text-white' : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}
                            onClick={() => setOutput('markdown')}
                        >
                            Markdown
                        </button>
                        <button
                            className={`${styles.outputButton} ${output === 'html' ? 'bg-blue-500 text-white' : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}
                            onClick={() => setOutput('html')}
                        >
                            HTML
                        </button>
                    </div>
                </div>
                <textarea
                    readOnly
                    value={output === 'markdown' ? markdown : html}
                    className={styles.outputTextarea}
                    rows={3}
                />
            </div>
        </div>
    );
};

export default CustomMarkdownEditor;