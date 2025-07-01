CREATE TABLE public.airports (
    id SERIAL PRIMARY KEY,
    source_id INT UNIQUE,
    airport_name varchar(255),
    city varchar(255),
    country varchar(255),
    iata varchar(255),
    icao varchar(255),
    latitude varchar(255),
    longitude varchar(255),
    altitude varchar(255),
    timezone varchar(255),
    dst varchar(255),
    tzdb_timezone varchar(255),
    airport_type varchar(255),
    source varchar(255)
)