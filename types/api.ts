// objects and such
export interface User {
  uid: string;
  email: string;
}




export interface Thing {
  id: number;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}




// F1 API Types
export interface F1Status {
  status: string;
  message?: string;
  timestamp?: string;
}




export interface F1Ping {
  pong: string;
  timestamp?: string;
}




export interface F1Driver {
  driverId: string;
  code: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
}




export interface F1Constructor {
  constructorId: string;
  url: string;
  name: string;
  nationality: string;
}




// Backend Database Models (matching C# classes)
export interface F1RaceResult {
  id: number;
  driver_Name: string;
  season: number;
  round: number;
  circuit_Name: string;
  result: number;
  grid: number;
  fastest_Lap_Time: string;
}




export interface F1Standing {
  id: number;
  driver: string;
  constructor: string;
  season: number;
  position: number;
  points: number;
  wins: number;
}




// Legacy F1 API Types (for external API)
export interface F1RaceResultLegacy {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: {
      circuitId: string;
      url: string;
      circuitName: string;
      Location: {
          lat: string;
          long: string;
          locality: string;
          country: string;
      };
  };
  date: string;
  time: string;
  Results: Array<{
      number: string;
      position: string;
      positionText: string;
      points: string;
      Driver: F1Driver;
      Constructor: F1Constructor;
      grid: string;
      laps: string;
      status: string;
      Time?: {
          millis: string;
          time: string;
      };
      FastestLap?: {
          rank: string;
          lap: string;
          Time: {
              time: string;
          };
          AverageSpeed: {
              units: string;
              speed: string;
          };
      };
  }>;
}




export interface F1StandingLegacy {
  season: string;
  round: string;
  DriverStandings?: Array<{
      position: string;
      positionText: string;
      points: string;
      wins: string;
      Driver: F1Driver;
      Constructors: F1Constructor[];
  }>;
  ConstructorStandings?: Array<{
      position: string;
      positionText: string;
      points: string;
      wins: string;
      Constructor: F1Constructor;
  }>;
}




export interface F1RaceResultsResponse {
  MRData: {
      xmlns: string;
      series: string;
      url: string;
      limit: string;
      offset: string;
      total: string;
      RaceTable: {
          season: string;
          round?: string;
          Races: F1RaceResultLegacy[];
      };
  };
}




export interface F1StandingsResponse {
  MRData: {
      xmlns: string;
      series: string;
      url: string;
      limit: string;
      offset: string;
      total: string;
      StandingsTable: {
          season: string;
          round?: string;
          DriverStandings?: F1StandingLegacy['DriverStandings'];
          ConstructorStandings?: F1StandingLegacy['ConstructorStandings'];
      };
  };
}









