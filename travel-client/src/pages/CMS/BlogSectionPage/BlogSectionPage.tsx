import React from 'react';
import CMSLayout from 'src/components/CMS/CMSLayout/CMSLayout';
import BlogSectionCMS from 'src/components/CMS/BlogSectionCMS/BlogSectionCMS';
import 'src/pages/CMS/CMSPage.scss';

const BlogSectionPage: React.FC = () => {
  return (
    <CMSLayout>
      <div className="cms-page">
        <div className="cms-page__header">
          <h2 className="cms-page__title">
            <i className="fa-solid fa-blog"></i>
            Blog Section
          </h2>
          <p className="cms-page__description">
            Manage blog posts and featured articles
          </p>
        </div>
        <div className="cms-page__content">
          <BlogSectionCMS />
        </div>
      </div>
    </CMSLayout>
  );
};

export default BlogSectionPage;
