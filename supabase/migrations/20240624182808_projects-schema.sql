drop table if exists categories;
drop table if exists forums;
drop table if exists posts;
drop table if exists threads;
drop table if exists users;

create table
    categories (
        id bigint primary key generated always as identity not null,
        created_at timestamptz default now() not null,
        name text not null,
        slug text unique not null,
        forums text array default array[]::varchar[]
             );

create table
    forums (
        id bigint primary key generated always as identity not null,
        created_at timestamptz default now() not null,
        name text not null,
        description text not null,
        slug text unique not null,
        category_id text,
        parent_id text,
        lastPost_id text,
        threads text array default array[]::varchar[]
             );

create table
    posts (
        id bigint primary key generated always as identity not null,
        created_at timestamptz default now() not null,
        text text not null,
        thread_id text not null,
        user_id text not null,
        published_at timestamptz not null,
        edited_at bigint,
        edited_by text,
        moderated bool default false not null
             );

create table
    threads (
        id bigint primary key generated always as identity not null,
        created_at timestamptz default now() not null,
        title text not null,
        slug text unique not null,
        user_id text not null,
        first_post_id bigint not null,
        published_at timestamptz not null,
        forum_id text not null,
        last_post_id text not null,
        last_post_at bigint not null,
        posts text array default array[]::varchar[],
        contributors text array default array[]::varchar[]
             );

create table
    users (
        id bigint primary key generated always as identity not null,
        created_at timestamptz default now() not null,
        name text not null,
        username text unique not null,
        email text unique not null,
        avatar text,
        last_visit_at timestamptz default now() not null,
        bio text,
        website text,
        twitter text,
        threads text array default array[]::varchar[],
        posts text array default array[]::varchar[]
             );
