"use client";

import { useState, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function TestDBPage() {
  const [tables, setTables] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkTables();
  }, []);

  const checkTables = async () => {
    try {
      // 테이블 목록 확인
      const { data: tableList, error: tableError } = await supabase
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'public');

      if (tableError) {
        // 대체 방법: 각 테이블 직접 확인
        const tablesToCheck = [
          'admin_settings',
          'chart_display_config', 
          'platform_links',
          'featured_songs',
          'admin_users',
          'streaming_platforms',
          'youtube_videos'
        ];

        const results = [];
        for (const table of tablesToCheck) {
          try {
            const { count, error } = await supabase
              .from(table)
              .select('*', { count: 'exact', head: true });
            
            results.push({
              table_name: table,
              exists: !error,
              count: count || 0,
              error: error?.message
            });
          } catch (e) {
            results.push({
              table_name: table,
              exists: false,
              count: 0,
              error: 'Table not found'
            });
          }
        }
        setTables(results);
      } else {
        setTables(tableList || []);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Supabase 테이블 확인</h1>
      
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      
      {!loading && !error && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">현재 테이블 목록:</h2>
          <div className="bg-gray-100 p-4 rounded">
            <pre className="text-sm">
              {JSON.stringify(tables, null, 2)}
            </pre>
          </div>
          
          <div className="mt-6">
            <h3 className="font-semibold mb-2">테이블 상태:</h3>
            <ul className="list-disc pl-5">
              {tables.map((table) => (
                <li key={table.table_name} className={table.exists ? "text-green-600" : "text-red-600"}>
                  {table.table_name}: {table.exists ? '✅ 존재' : '❌ 없음'} 
                  {table.count !== undefined && ` (${table.count}개 레코드)`}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}