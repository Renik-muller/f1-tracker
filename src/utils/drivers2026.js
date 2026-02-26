// Static 2026 F1 driver roster — confirmed lineups

export const DRIVERS_2026 = [
    // Red Bull Racing
    {
        driverId: 'max_verstappen', givenName: 'Max', familyName: 'Verstappen', permanentNumber: '1',
        nationality: 'dutch', dateOfBirth: '1997-09-30',
        url: 'https://en.wikipedia.org/wiki/Max_Verstappen',
        Constructors: [{ constructorId: 'red_bull', name: 'Red Bull Racing' }]
    },
    {
        driverId: 'isack_hadjar', givenName: 'Isack', familyName: 'Hadjar', permanentNumber: '6',
        nationality: 'french', dateOfBirth: '2004-09-28',
        url: 'https://en.wikipedia.org/wiki/Isack_Hadjar',
        Constructors: [{ constructorId: 'red_bull', name: 'Red Bull Racing' }]
    },

    // McLaren
    {
        driverId: 'lando_norris', givenName: 'Lando', familyName: 'Norris', permanentNumber: '4',
        nationality: 'british', dateOfBirth: '1999-11-13',
        url: 'https://en.wikipedia.org/wiki/Lando_Norris',
        Constructors: [{ constructorId: 'mclaren', name: 'McLaren' }]
    },
    {
        driverId: 'oscar_piastri', givenName: 'Oscar', familyName: 'Piastri', permanentNumber: '81',
        nationality: 'australian', dateOfBirth: '2001-04-06',
        url: 'https://en.wikipedia.org/wiki/Oscar_Piastri',
        Constructors: [{ constructorId: 'mclaren', name: 'McLaren' }]
    },

    // Ferrari
    {
        driverId: 'charles_leclerc', givenName: 'Charles', familyName: 'Leclerc', permanentNumber: '16',
        nationality: 'monegasque', dateOfBirth: '1997-10-16',
        url: 'https://en.wikipedia.org/wiki/Charles_Leclerc',
        Constructors: [{ constructorId: 'ferrari', name: 'Ferrari' }]
    },
    {
        driverId: 'lewis_hamilton', givenName: 'Lewis', familyName: 'Hamilton', permanentNumber: '44',
        nationality: 'british', dateOfBirth: '1985-01-07',
        url: 'https://en.wikipedia.org/wiki/Lewis_Hamilton',
        Constructors: [{ constructorId: 'ferrari', name: 'Ferrari' }]
    },

    // Mercedes
    {
        driverId: 'george_russell', givenName: 'George', familyName: 'Russell', permanentNumber: '63',
        nationality: 'british', dateOfBirth: '1998-02-15',
        url: 'https://en.wikipedia.org/wiki/George_Russell_(racing_driver)',
        Constructors: [{ constructorId: 'mercedes', name: 'Mercedes' }]
    },
    {
        driverId: 'kimi_antonelli', givenName: 'Kimi', familyName: 'Antonelli', permanentNumber: '12',
        nationality: 'italian', dateOfBirth: '2006-08-25',
        url: 'https://en.wikipedia.org/wiki/Andrea_Kimi_Antonelli',
        Constructors: [{ constructorId: 'mercedes', name: 'Mercedes' }]
    },

    // Aston Martin
    {
        driverId: 'fernando_alonso', givenName: 'Fernando', familyName: 'Alonso', permanentNumber: '14',
        nationality: 'spanish', dateOfBirth: '1981-07-29',
        url: 'https://en.wikipedia.org/wiki/Fernando_Alonso',
        Constructors: [{ constructorId: 'aston_martin', name: 'Aston Martin' }]
    },
    {
        driverId: 'lance_stroll', givenName: 'Lance', familyName: 'Stroll', permanentNumber: '18',
        nationality: 'canadian', dateOfBirth: '1998-10-29',
        url: 'https://en.wikipedia.org/wiki/Lance_Stroll',
        Constructors: [{ constructorId: 'aston_martin', name: 'Aston Martin' }]
    },

    // Alpine
    {
        driverId: 'pierre_gasly', givenName: 'Pierre', familyName: 'Gasly', permanentNumber: '10',
        nationality: 'french', dateOfBirth: '1996-02-07',
        url: 'https://en.wikipedia.org/wiki/Pierre_Gasly',
        Constructors: [{ constructorId: 'alpine', name: 'Alpine' }]
    },
    {
        driverId: 'franco_colapinto', givenName: 'Franco', familyName: 'Colapinto', permanentNumber: '43',
        nationality: 'argentinian', dateOfBirth: '2003-05-27',
        url: 'https://en.wikipedia.org/wiki/Franco_Colapinto',
        Constructors: [{ constructorId: 'alpine', name: 'Alpine' }]
    },

    // Haas
    {
        driverId: 'oliver_bearman', givenName: 'Oliver', familyName: 'Bearman', permanentNumber: '87',
        nationality: 'british', dateOfBirth: '2005-05-08',
        url: 'https://en.wikipedia.org/wiki/Oliver_Bearman',
        Constructors: [{ constructorId: 'haas', name: 'Haas' }]
    },
    {
        driverId: 'esteban_ocon', givenName: 'Esteban', familyName: 'Ocon', permanentNumber: '31',
        nationality: 'french', dateOfBirth: '1996-09-17',
        url: 'https://en.wikipedia.org/wiki/Esteban_Ocon',
        Constructors: [{ constructorId: 'haas', name: 'Haas' }]
    },

    // Racing Bulls
    {
        driverId: 'liam_lawson', givenName: 'Liam', familyName: 'Lawson', permanentNumber: '30',
        nationality: 'new zealander', dateOfBirth: '2002-02-11',
        url: 'https://en.wikipedia.org/wiki/Liam_Lawson',
        Constructors: [{ constructorId: 'rb', name: 'Racing Bulls' }]
    },
    {
        driverId: 'arvid_lindblad', givenName: 'Arvid', familyName: 'Lindblad', permanentNumber: '5',
        nationality: 'british', dateOfBirth: '2007-03-27',
        url: 'https://en.wikipedia.org/wiki/Arvid_Lindblad',
        Constructors: [{ constructorId: 'rb', name: 'Racing Bulls' }]
    },

    // Williams
    {
        driverId: 'alexander_albon', givenName: 'Alexander', familyName: 'Albon', permanentNumber: '23',
        nationality: 'thai', dateOfBirth: '1996-03-23',
        url: 'https://en.wikipedia.org/wiki/Alexander_Albon',
        Constructors: [{ constructorId: 'williams', name: 'Williams' }]
    },
    {
        driverId: 'carlos_sainz', givenName: 'Carlos', familyName: 'Sainz', permanentNumber: '55',
        nationality: 'spanish', dateOfBirth: '1994-09-01',
        url: 'https://en.wikipedia.org/wiki/Carlos_Sainz_Jr.',
        Constructors: [{ constructorId: 'williams', name: 'Williams' }]
    },

    // Audi (formerly Sauber)
    {
        driverId: 'nico_hulkenberg', givenName: 'Nico', familyName: 'Hülkenberg', permanentNumber: '27',
        nationality: 'german', dateOfBirth: '1987-08-19',
        url: 'https://en.wikipedia.org/wiki/Nico_H%C3%BClkenberg',
        Constructors: [{ constructorId: 'audi', name: 'Audi' }]
    },
    {
        driverId: 'gabriel_bortoleto', givenName: 'Gabriel', familyName: 'Bortoleto', permanentNumber: '16',
        nationality: 'brazilian', dateOfBirth: '2004-10-14',
        url: 'https://en.wikipedia.org/wiki/Gabriel_Bortoleto',
        Constructors: [{ constructorId: 'audi', name: 'Audi' }]
    },

    // Cadillac (new team 2026)
    {
        driverId: 'sergio_perez', givenName: 'Sergio', familyName: 'Pérez', permanentNumber: '11',
        nationality: 'mexican', dateOfBirth: '1990-01-26',
        url: 'https://en.wikipedia.org/wiki/Sergio_P%C3%A9rez',
        Constructors: [{ constructorId: 'cadillac', name: 'Cadillac' }]
    },
    {
        driverId: 'valtteri_bottas', givenName: 'Valtteri', familyName: 'Bottas', permanentNumber: '77',
        nationality: 'finnish', dateOfBirth: '1989-08-28',
        url: 'https://en.wikipedia.org/wiki/Valtteri_Bottas',
        Constructors: [{ constructorId: 'cadillac', name: 'Cadillac' }]
    },
];
