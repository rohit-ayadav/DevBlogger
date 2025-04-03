const BlogApproved = (name: string, blogTitle: string, blogUrl: string): string => {
    const authorName = name || "Author";
    const BlogTitle = blogTitle || "Your Blog Title";
    const BlogUrl = blogUrl || "https://devblogger.in/blogs";
    const currentYear = new Date().getFullYear();

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog Approval Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f7fb;
        }
        .container {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .logo {
            max-width: 150px;
            margin-bottom: 20px;
        }
        h1 {
            color: #2563eb;
            margin-bottom: 20px;
        }
        .content {
            margin-bottom: 30px;
        }
        .cta-button {
            display: inline-block;
            background-color: #2563eb;
            color: white !important;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            margin: 20px 0;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eaeaea;
            font-size: 14px;
            color: #666;
            text-align: center;
        }
        .visibility-info {
            background-color: #f0f9ff;
            border-left: 4px solid #2563eb;
            padding: 15px;
            margin: 20px 0;
        }
        .social-share {
            margin: 20px 0;
            text-align: center;
        }
        .social-icon {
            display: inline-block;
            margin: 0 8px;
            width: 32px;
            height: 32px;
        }
        @media only screen and (max-width: 480px) {
            .container {
                padding: 20px 15px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://devblogger.in/logo.png" alt="DevBlogger Logo" class="logo" />
            <h1>Congratulations! Your Blog is Approved</h1>
        </div>
        <div class="content">
            <p>Dear ${authorName},</p>
           
            <p>We're excited to inform you that your blog post <strong>"${blogTitle}"</strong> has been approved and is now live on DevBlogger! Thank you for your valuable contribution to our community.</p>
           
            <div class="visibility-info">
                <p><strong>Your blog is now public</strong>, which means:</p>
                <ul>
                    <li>It's displayed on the DevBlogger platform</li>
                    <li>Anyone can discover and read it</li>
                    <li>It will appear in relevant searches and categories</li>
                    <li>Other users can engage with your content</li>
                </ul>
            </div>
           
            <p>We encourage you to share your blog with your network and engage with readers who comment on your post.</p>
           
            <div style="text-align: center; margin: 25px 0;">
                <a href="${blogUrl}" target="_blank" class="cta-button">View Your Published Blog</a>
            </div>
            
            <div class="social-share">
                <p>Share your blog with your network:</p>
                <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(BlogUrl)}&text=${encodeURIComponent(`Check out my new blog post: ${BlogTitle} on DevBlogger!`)}" target="_blank" class="social-icon">
                    <img src="https://devblogger.in/images/twitter-icon.png" alt="Twitter" width="32" height="32" />
                </a>
                <a href="https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(BlogUrl)}&title=${encodeURIComponent(BlogTitle)}" target="_blank" class="social-icon">
                    <img src="https://devblogger.in/images/linkedin-icon.png" alt="LinkedIn" width="32" height="32" />
                </a>
                <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(BlogUrl)}" target="_blank" class="social-icon">
                    <img src="https://devblogger.in/images/facebook-icon.png" alt="Facebook" width="32" height="32" />
                </a>
            </div>
           
            <p>Remember, if you ever want to make your blog private, you can do so from your dashboard. Private blogs are only accessible to people who have the direct link.</p>
           
            <p>Keep writing and sharing your knowledge with the DevBlogger community!</p>
           
            <p>Best Regards,<br>The DevBlogger Team</p>
        </div>
       
        <div class="footer">
            <p>© ${currentYear} DevBlogger. All rights reserved.</p>
            <p>Questions? Contact us at <a href="mailto:support@devblogger.in">support@devblogger.in</a></p>
            <p><small>If you no longer wish to receive these emails, you can <a href="https://devblogger.in/settings/notifications">unsubscribe here</a>.</small></p>
        </div>
    </div>
</body>
</html>`;
};

const BlogRejected = (name: string, blogTitle: string, reason: string, dashboardUrl: string): string => {
    const authorName = name || "Author";
    const BlogTitle = blogTitle || "Your Blog Title";
    const rejectionReason = reason || "It doesn't meet our community guidelines.";
    const dashboardLink = dashboardUrl || "https://devblogger.in/dashboard";
    const currentYear = new Date().getFullYear();

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog Submission Update</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f7fb;
        }
        .container {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .logo {
            max-width: 150px;
            margin-bottom: 20px;
        }
        h1 {
            color: #4b5563;
            margin-bottom: 20px;
        }
        .content {
            margin-bottom: 30px;
        }
        .cta-button {
            display: inline-block;
            background-color: #4b5563;
            color: white !important;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            margin: 20px 0;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eaeaea;
            font-size: 14px;
            color: #666;
            text-align: center;
        }
        .feedback-box {
            background-color: #f9fafb;
            border-left: 4px solid #4b5563;
            padding: 15px;
            margin: 20px 0;
        }
        .tips-section {
            background-color: #f0f9ff;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
        }
        @media only screen and (max-width: 480px) {
            .container {
                padding: 20px 15px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://devblogger.in/logo.png" alt="DevBlogger Logo" class="logo" />
            <h1>Update on Your Blog Submission</h1>
        </div>
        <div class="content">
            <p>Dear ${authorName},</p>
           
            <p>Thank you for submitting your blog post <strong>"${BlogTitle}"</strong> to DevBlogger. We appreciate the time and effort you put into creating content for our platform.</p>
           
            <p>After careful review, we've determined that your submission needs some adjustments before it can be published. Here's the feedback from our review team:</p>
           
            <div class="feedback-box">
                <p><strong>Feedback:</strong></p>
                <p>${rejectionReason}</p>
            </div>
           
            <div class="tips-section">
                <p><strong>Next Steps:</strong></p>
                <ul>
                    <li>Review the feedback provided</li>
                    <li>Make the necessary revisions to your blog</li>
                    <li>Resubmit your blog from your dashboard</li>
                </ul>
            </div>
           
            <p>We encourage you to make the suggested changes and resubmit your blog. Our goal is to help you create content that resonates with our community while maintaining the quality standards of DevBlogger.</p>
           
            <div style="text-align: center; margin: 25px 0;">
                <a href="${dashboardLink}" target="_blank" class="cta-button">Go to Your Dashboard</a>
            </div>
           
            <p>If you have any questions about the feedback or need further clarification, please don't hesitate to reach out to our support team.</p>
           
            <p>Best Regards,<br>The DevBlogger Team</p>
        </div>
       
        <div class="footer">
            <p>© ${currentYear} DevBlogger. All rights reserved.</p>
            <p>Questions? Contact us at <a href="mailto:support@devblogger.in">support@devblogger.in</a></p>
            <p><small>If you no longer wish to receive these emails, you can <a href="https://devblogger.in/settings/notifications">unsubscribe here</a>.</small></p>
        </div>
    </div>
</body>
</html>`;
};

export { BlogApproved, BlogRejected };