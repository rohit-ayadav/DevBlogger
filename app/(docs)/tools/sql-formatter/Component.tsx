"use client";
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { format } from 'sql-formatter';

/**
 * SQLFormatter - A comprehensive tool for formatting and beautifying SQL queries
 * Features include syntax highlighting, formatting options, and support for multiple SQL dialects.
 */
const SQLFormatter: React.FC = () => {
    // SQL input and formatted output
    const [sqlInput, setSqlInput] = useState<string>('');
    const [formattedSQL, setFormattedSQL] = useState<string>('');

    // Formatting options
    const [dialect, setDialect] = useState<'sql' | 'bigquery' | 'db2' | 'db2i' | 'hive' | 'mariadb' | 'mysql' | 'tidb' | 'n1ql' | 'plsql' | 'postgresql' | 'redshift' | 'spark' | 'sqlite' | 'trino' | 'transactsql' | 'singlestoredb' | 'snowflake' | 'tsql'>('sql');
    const [indentSize, setIndentSize] = useState<number>(2);
    const [uppercase, setUppercase] = useState<boolean>(false);
    const [linesBetweenQueries, setLinesBetweenQueries] = useState<number>(1);

    // UI state
    const [copySuccess, setCopySuccess] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [tabSize, setTabSize] = useState<number>(2);

    // Format the SQL when the input or formatting options change
    useEffect(() => {
        if (!sqlInput.trim()) {
            setFormattedSQL('');
            setError('');
            return;
        }

        try {
            const options = {
                language: dialect,
                indent: ' '.repeat(indentSize),
                uppercase: uppercase,
                linesBetweenQueries: linesBetweenQueries,
            };

            const result = format(sqlInput, options);
            setFormattedSQL(result);
            setError('');
        } catch (err) {
            setError((err as Error).message || 'An error occurred while formatting the SQL.');
            // Keep the last valid formatted result
        }
    }, [sqlInput, dialect, indentSize, uppercase, linesBetweenQueries]);

    // Copy to clipboard function
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(
            () => {
                setCopySuccess('Copied!');
                setTimeout(() => setCopySuccess(''), 2000);
            },
            () => {
                setCopySuccess('Failed to copy');
            }
        );
    };

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSqlInput(e.target.value);
    };

    // Clear all fields
    const clearAll = () => {
        setSqlInput('');
        setFormattedSQL('');
        setError('');
    };

    // Example SQL queries
    const examples = [
        {
            name: "Simple SELECT",
            sql: "SELECT id, name, email FROM users WHERE status = 'active' ORDER BY name ASC LIMIT 100;"
        },
        {
            name: "JOIN Example",
            sql: "SELECT o.order_id, c.customer_name, p.product_name, o.quantity FROM orders o INNER JOIN customers c ON o.customer_id = c.id INNER JOIN products p ON o.product_id = p.id WHERE o.order_date > '2023-01-01' AND p.category = 'Electronics';"
        },
        {
            name: "GROUP BY with HAVING",
            sql: "SELECT department, COUNT(*) AS employee_count, AVG(salary) AS avg_salary FROM employees GROUP BY department HAVING COUNT(*) > 5 ORDER BY avg_salary DESC;"
        },
        {
            name: "INSERT Statement",
            sql: "INSERT INTO products (product_name, category, price, stock_quantity, created_at) VALUES ('Smartphone X', 'Electronics', 699.99, 50, CURRENT_TIMESTAMP);"
        },
        {
            name: "UPDATE with JOIN",
            sql: "UPDATE orders o JOIN order_details od ON o.order_id = od.order_id SET o.status = 'Shipped', o.updated_at = CURRENT_TIMESTAMP WHERE od.product_id IN (SELECT id FROM products WHERE category = 'Books') AND o.created_at < '2023-03-01';"
        },
        {
            name: "CTE Example",
            sql: "WITH ranked_sales AS (SELECT salesperson_id, SUM(amount) AS total_sales, RANK() OVER (ORDER BY SUM(amount) DESC) AS sales_rank FROM sales WHERE sale_date BETWEEN '2023-01-01' AND '2023-12-31' GROUP BY salesperson_id) SELECT s.name, rs.total_sales, rs.sales_rank FROM ranked_sales rs JOIN salespersons s ON rs.salesperson_id = s.id WHERE rs.sales_rank <= 5;"
        }
    ];

    // Load an example
    const loadExample = (sql: string) => {
        setSqlInput(sql);
    };

    return (
        <>

            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">DevBlogger SQL Formatter</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Format and beautify your SQL queries with syntax highlighting
                    </p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg mb-8 text-sm text-gray-700 dark:text-gray-300">
                    <h2 className="text-lg font-semibold mb-2">About This SQL Formatter</h2>
                    <p className="mb-2">
                        Our SQL formatter helps you transform messy, unformatted SQL queries into clean, readable code.
                        Whether you're working with complex JOINs, nested subqueries, or CTEs, this tool will improve readability and help you spot syntax errors.
                    </p>
                    <p>
                        Simply paste your SQL code, adjust the formatting options to your preference, and get properly indented, consistently formatted SQL instantly.
                        Supports MySQL, PostgreSQL, SQL Server, Oracle, and more. Perfect for database developers, data analysts, and anyone working with SQL.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        {/* Main SQL input section */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                            <div className="mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <label htmlFor="sql-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        SQL Input
                                    </label>
                                    <div className="text-sm">
                                        <button
                                            className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400"
                                            onClick={() => copyToClipboard(sqlInput)}
                                        >
                                            Copy Input
                                        </button>
                                    </div>
                                </div>
                                <textarea
                                    id="sql-input"
                                    rows={10}
                                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md font-mono"
                                    placeholder="Paste your SQL query here..."
                                    value={sqlInput}
                                    onChange={handleInputChange}
                                    style={{ tabSize: tabSize }}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label htmlFor="dialect" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        SQL Dialect
                                    </label>
                                    <select
                                        id="dialect"
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                        value={dialect}
                                        onChange={(e) => setDialect(e.target.value as typeof dialect)}
                                    >
                                        <option value="sql">Standard SQL</option>
                                        <option value="mysql">MySQL</option>
                                        <option value="postgresql">PostgreSQL</option>
                                        <option value="tsql">SQL Server (T-SQL)</option>
                                        <option value="plsql">Oracle (PL/SQL)</option>
                                        <option value="sqlite">SQLite</option>
                                        <option value="mariadb">MariaDB</option>
                                        <option value="bigquery">BigQuery</option>
                                        <option value="spark">Spark SQL</option>
                                        <option value="redshift">Redshift</option>
                                        <option value="db2">DB2</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="indent-size" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Indent Size
                                    </label>
                                    <input
                                        type="number"
                                        id="indent-size"
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                        value={indentSize}
                                        min={1}
                                        max={8}
                                        onChange={(e) => setIndentSize(parseInt(e.target.value, 10) || 2)}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-6 mb-6">
                                <div className="flex items-center">
                                    <input
                                        id="uppercase"
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        checked={uppercase}
                                        onChange={(e) => setUppercase(e.target.checked)}
                                    />
                                    <label htmlFor="uppercase" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                        Uppercase Keywords
                                    </label>
                                </div>

                                <div>
                                    <label htmlFor="lines-between-queries" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Lines Between Queries
                                    </label>
                                    <input
                                        type="number"
                                        id="lines-between-queries"
                                        className="mt-1 block w-24 pl-3 pr-10 py-1 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                        value={linesBetweenQueries}
                                        min={0}
                                        max={5}
                                        onChange={(e) => setLinesBetweenQueries(parseInt(e.target.value, 10) || 1)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Formatted output section */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Formatted SQL</h2>
                                <div className="text-sm">
                                    <button
                                        className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400"
                                        onClick={() => copyToClipboard(formattedSQL)}
                                        disabled={!formattedSQL}
                                    >
                                        Copy Result {copySuccess && <span className="ml-1 text-green-500">{copySuccess}</span>}
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-md text-sm">
                                    <p className="font-medium">Error:</p>
                                    <p>{error}</p>
                                </div>
                            )}

                            <div className="relative">
                                <pre className="p-4 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 overflow-x-auto text-sm text-gray-800 dark:text-gray-200 font-mono whitespace-pre" style={{ minHeight: '200px', tabSize: tabSize }}>
                                    {formattedSQL || <span className="text-gray-400 dark:text-gray-500">Formatted SQL will appear here...</span>}
                                </pre>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        {/* Examples */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Examples</h2>
                            <div className="space-y-3">
                                {examples.map((example, index) => (
                                    <div
                                        key={index}
                                        className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition"
                                        onClick={() => loadExample(example.sql)}
                                    >
                                        <div className="font-medium text-gray-700 dark:text-gray-300">{example.name}</div>
                                        <div className="mt-1 text-xs font-mono text-gray-500 dark:text-gray-400 truncate">
                                            {example.sql.substring(0, 50)}...
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* SQL Reference */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">SQL Quick Reference</h2>
                            <div className="space-y-4 text-sm">
                                <div>
                                    <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-1">SELECT Statement</h3>
                                    <div className="text-gray-600 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded-md text-xs overflow-x-auto">
                                        SELECT column1, column2<br />
                                        FROM table_name<br />
                                        WHERE condition<br />
                                        GROUP BY column1<br />
                                        HAVING condition<br />
                                        ORDER BY column1 [ASC|DESC]<br />
                                        LIMIT offset, count;
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-1">JOIN Types</h3>
                                    <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                                        <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">INNER JOIN</code> - Returns records with matching values in both tables</li>
                                        <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">LEFT JOIN</code> - Returns all records from left table, and matching from right</li>
                                        <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">RIGHT JOIN</code> - Returns all records from right table, and matching from left</li>
                                        <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">FULL JOIN</code> - Returns all records when there's a match in either table</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Common Functions</h3>
                                    <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                                        <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">COUNT(), SUM(), AVG()</code> - Aggregate functions</li>
                                        <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">CONCAT(), SUBSTRING()</code> - String functions</li>
                                        <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">DATE(), NOW(), DATEDIFF()</code> - Date functions</li>
                                        <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">COALESCE(), IFNULL()</code> - NULL handling</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Actions</h2>
                            <div className="space-y-3">
                                <button
                                    onClick={clearAll}
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                    Clear All
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">SQL Formatting Best Practices</h2>
                    <div className="text-gray-700 dark:text-gray-300 space-y-3 text-sm">
                        <p><strong>1. Consistent Capitalization:</strong> Capitalize SQL keywords (SELECT, FROM, WHERE) for better readability. Our tool can do this automatically.</p>
                        <p><strong>2. Proper Indentation:</strong> Indent your code to show logical structure, especially for nested queries and joined tables.</p>
                        <p><strong>3. Line Breaks:</strong> Use line breaks to separate logical parts of your query. Each clause (SELECT, FROM, WHERE, etc.) typically starts on a new line.</p>
                        <p><strong>4. Aliasing:</strong> Use meaningful table aliases, especially when working with multiple tables in JOINs.</p>
                        <p><strong>5. Comments:</strong> Add comments to complex queries explaining the purpose or logic of specific sections.</p>
                    </div>
                    <div className="mt-6 border-t pt-4 text-gray-600 dark:text-gray-400">
                        <h3 className="font-medium mb-2">Tips for Writing Maintainable SQL:</h3>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>Break down complex queries into CTEs (Common Table Expressions) for readability</li>
                            <li>Avoid using SELECT * and specify column names explicitly</li>
                            <li>Use consistent naming conventions for objects and columns</li>
                            <li>Optimize queries by filtering data early in the execution plan</li>
                            <li>Regularly format your SQL code before sharing or committing to version control</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                    <p>Made with ❤️ for developers by <a href="https://devblogger.in" className="text-blue-500 hover:text-blue-700">DevBlogger</a></p>
                </div>
            </div>
        </>
    );
};

export default SQLFormatter;