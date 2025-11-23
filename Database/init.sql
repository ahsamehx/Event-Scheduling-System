
create table if not exists users (
    user_id serial primary key,
    firstname varchar(50) not null,
    lastname varchar(50) not null,
    username varchar(50) unique not null,
    password_hash varchar(255) not null,
    email varchar(100) unique not null,
    created_at timestamp default CURRENT_TIMESTAMP
);



create table if not exists events (
    event_id serial primary key,
    organizer_id integer not null references users(user_id) on delete cascade,
    title varchar(100) not null,
    description text,
    event_date date not null,
    location varchar(255),
    created_at timestamp default current_timestamp
);

create table if not exists event_attendees (
    attendee_id serial primary key,
    event_id integer not null references events(event_id) on delete cascade,
    user_id integer not null references users(user_id) on delete cascade,
    role_in_event varchar(20) check (role_in_event in ('organizer', 'attendee', 'collaborator')),
    joined_at timestamp default current_timestamp,
    unique(event_id, user_id)
);

create table if not exists invitations (
    invitation_id serial primary key,
    event_id integer not null references events(event_id) on delete cascade,
    sender_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    recipient_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Accepted', 'Rejected')),
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    responded_at TIMESTAMP,
    unique(event_id, recipient_id)
);

create table if not exists registrations (
    registration_id serial primary key,
    event_id integer not null references events(event_id) on delete cascade,
    user_id integer not null references users(user_id) on delete cascade,
    response_status varchar(20) check (response_status in ('Going', 'Maybe', 'Not Going')),
    registration_date timestamp default current_timestamp,
    unique(event_id, user_id)
);


