CREATE TABLE public.airports (
    id SERIAL PRIMARY KEY,
    source_id INT UNIQUE,
    airportName varchar(255),
    city varchar(255),
    country varchar(255),
    IATA varchar(255),
    ICAO varchar(255),
    latitude varchar(255),
    longitude varchar(255),
    altitude varchar(255),
    timezone varchar(255),
    DST varchar(255),
    tzDBTimezone varchar(255),
    airportType varchar(255),
    source varchar(255)
)