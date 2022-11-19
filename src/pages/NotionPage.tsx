import React, { useEffect } from 'react';
import AuthLayout from '../components/AuthLayout';
import { Client } from '@notionhq/client';
import { NOTION_DATABASE, NOTION_TOKEN } from '../config';

const notion = new Client({ auth: NOTION_TOKEN });

const NotionPage = () => {
  useEffect(() => {
    getNotionData()
  }, []);

  return (
    <AuthLayout>
      <div>NOTION PAGE</div>
    </AuthLayout>
  );
}

async function getNotionData() {
  if (!NOTION_TOKEN || !NOTION_DATABASE) return []

  const response = await notion.databases.retrieve({ database_id: NOTION_DATABASE });
  console.log(response)

  return response
}

export default NotionPage;
