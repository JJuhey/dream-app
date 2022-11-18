import React, { useEffect } from 'react';
import AuthLayout from '../components/AuthLayout';
import { Client } from '@notionhq/client';

const TOKEN = process.env.REACT_APP_NOTION_TOKEN
const DATABASE_ID = process.env.REACT_APP_NOTION_DATABASE

const notion = new Client({ auth: TOKEN });

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
  if (!TOKEN || !DATABASE_ID) return []

  const response = await notion.databases.retrieve({ database_id: DATABASE_ID });
  console.log(response)

  return response
}

export default NotionPage;
