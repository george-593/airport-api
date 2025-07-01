CREATE TABLE public.airports (
    id SERIAL PRIMARY KEY,
    airportName varchar(255),
    city varchar(255),
    country varchar(255),
    IATA varchar(3),
    ICAO varchar(4),
    latitude varchar(255),
    longitude varchar(255),
    altitude varchar(255),
    timezone varchar(255),
    DST varchar(255),
    tzDBTimezone varchar(255),
    airportType varchar(255),
    source varchar(255)
)