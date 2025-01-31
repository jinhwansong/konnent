'use client';
import React from 'react';
import DOMPurify from 'dompurify';
export default function HtmlContent({ html }: { html: string }) {
  const htmls = DOMPurify.sanitize(html);
  return <div dangerouslySetInnerHTML={{ __html: htmls }} />;
}
