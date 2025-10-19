-- 중복 키 제약조건 문제 해결
-- Supabase Dashboard > SQL Editor에서 실행

-- 1. 현재 제약조건 확인
SELECT 
    conname AS constraint_name,
    pg_get_constraintdef(c.oid) AS constraint_definition
FROM pg_constraint c
JOIN pg_namespace n ON n.oid = c.connamespace
WHERE n.nspname = 'public' 
AND c.conrelid = 'platform_links'::regclass;

-- 2. unique_platform_song_device 제약조건 삭제 (있다면)
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint c
        JOIN pg_namespace n ON n.oid = c.connamespace
        WHERE n.nspname = 'public' 
        AND c.conrelid = 'platform_links'::regclass
        AND c.conname = 'unique_platform_song_device'
    ) THEN
        ALTER TABLE public.platform_links DROP CONSTRAINT unique_platform_song_device;
        RAISE NOTICE 'unique_platform_song_device 제약조건이 삭제되었습니다.';
    ELSE
        RAISE NOTICE 'unique_platform_song_device 제약조건이 존재하지 않습니다.';
    END IF;
END $$;