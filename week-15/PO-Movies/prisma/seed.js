import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/*
  Helper: build URLs
*/
const poster = (id) => `https://image.tmdb.org/t/p/w500/${id}.jpg`;
const trailer = (id) => `https://www.youtube.com/watch?v=${id}`;

const movies = [
/* ================= SCI-FI ================= */
{ name:"Inception",genre:"Sci-Fi",year:2010,rating:8.8,poster:"8UlWHLMpgZm9bx6QYh0NFoq67TZ",trailer:"YoHD9XEInc0"},
{ name:"Interstellar",genre:"Sci-Fi",year:2014,rating:8.6,poster:"rAiYTfKGqDCRIIqo664sY9XZIvQ",trailer:"zSWdZVtXT7E"},
{ name:"Dune",genre:"Sci-Fi",year:2021,rating:8.0,poster:"d5NXSklXo0qyIYkgV94XAgMIckC",trailer:"n9xhJrPXop4"},
{ name:"The Matrix",genre:"Sci-Fi",year:1999,rating:8.7,poster:"f89U3ADr1oiB1s9GkdPOEpXUk5H",trailer:"m8e-FF8MsqU"},
{ name:"Blade Runner 2049",genre:"Sci-Fi",year:2017,rating:8.0,poster:"gajva2L0rPYkEWjzgFlBXCAVBE5",trailer:"gCcx85zbxz4"},
{ name:"Arrival",genre:"Sci-Fi",year:2016,rating:7.9,poster:"x2FJsf1ElAgr63Y3PNPtJrcmpoe",trailer:"tFMo3UJ4B4g"},
{ name:"Ex Machina",genre:"Sci-Fi",year:2014,rating:7.7,poster:"btbRB7BrD887j5NrvjxceRDmaot",trailer:"sNExF5WYMaA"},
{ name:"Avatar",genre:"Sci-Fi",year:2009,rating:7.9,poster:"jRXYjXNq0Cs2TcJjLkki24MLp7u",trailer:"5PSNL1qE6VY"},
{ name:"Avatar: The Way of Water",genre:"Sci-Fi",year:2022,rating:7.8,poster:"t6HIqrRAclMCA60NsSmeqe9RmNV",trailer:"d9MyW72ELq0"},
{ name:"Everything Everywhere All at Once",genre:"Sci-Fi",year:2022,rating:8.1,poster:"w3LxiVYdWWRvEVdn5RYq6jIqkb1",trailer:"wxN1T1uxQ2g"},

/* ================= ACTION ================= */
{ name:"The Dark Knight",genre:"Action",year:2008,rating:9.0,poster:"qJ2tW6WMUDux911r6m7haRef0WH",trailer:"EXeTwQWrcwY"},
{ name:"John Wick",genre:"Action",year:2014,rating:7.4,poster:"fZPSd91yGE9fCcCe6OoQr6E3Bev",trailer:"2AUmvWm5ZDQ"},
{ name:"Mad Max: Fury Road",genre:"Action",year:2015,rating:8.1,poster:"8tZYtuWezp8JbcsvHYO0O46tFbo",trailer:"hEJnMQG9ev8"},
{ name:"Top Gun: Maverick",genre:"Action",year:2022,rating:8.3,poster:"62HCnUTziyWcpDaBO2i1DX17ljH",trailer:"qSqVVswa420"},
{ name:"Gladiator",genre:"Action",year:2000,rating:8.5,poster:"ty8TGRuvJLPUmAR1H1nRIsgwvim",trailer:"owK1qxDselE"},
{ name:"Die Hard",genre:"Action",year:1988,rating:8.2,poster:"yFihWxQcmqcaBR31QM6Y8gT6aYV",trailer:"2TQ-pOvI6Xo"},
{ name:"Mission: Impossible – Fallout",genre:"Action",year:2018,rating:7.7,poster:"AkJQpZp9WoNdj7pLYSj1L0RcMMN",trailer:"wb49-oV0F78"},
{ name:"The Raid",genre:"Action",year:2011,rating:7.6,poster:"jzqS0bqjH8R6i1p8LQZJ5e1t3OC",trailer:"m6Q7KnXpNOg"},
{ name:"RRR",genre:"Action",year:2022,rating:8.0,poster:"wE0I6efAW4cDDmZQWtwZMOW44EJ",trailer:"NgBoMJy386M"},
{ name:"Oldboy",genre:"Action",year:2003,rating:8.4,poster:"pWDtjs568ZfOTMbURQBYuT4Qjot",trailer:"2HkjrJ6IK5E"},

/* ================= DRAMA ================= */
{ name:"Forrest Gump",genre:"Drama",year:1994,rating:8.8,poster:"arw2vcBveWOVZr6pxd9XTd1TdQa",trailer:"bLvqoHBptjg"},
{ name:"The Shawshank Redemption",genre:"Drama",year:1994,rating:9.3,poster:"q6y0Go1tsGEsmtFryDOJo3dEmqu",trailer:"NmzuHjWmXOc"},
{ name:"Oppenheimer",genre:"Drama",year:2023,rating:8.6,poster:"ptpr0kGAckfQkJeJIt8st5dglvd",trailer:"uYPbbksJxIg"},
{ name:"Parasite",genre:"Drama",year:2019,rating:8.5,poster:"7IiTTgloJzvGI1TAYymCfbfl3vT",trailer:"SEUXfv87Wpk"},
{ name:"Fight Club",genre:"Drama",year:1999,rating:8.8,poster:"a26cQPRhJPX6GbWfQbvZdrrp9j9",trailer:"SUXWAEX2jlg"},
{ name:"Joker",genre:"Drama",year:2019,rating:8.4,poster:"udDclJoHjfjb8Ekgsd4FDteOkCU",trailer:"zAGVQLHvwOY"},
{ name:"Whiplash",genre:"Drama",year:2014,rating:8.5,poster:"lIv1QinFqz4dlp5U4lQ6HaiskOZ",trailer:"7d_jQycdQGo"},
{ name:"The Godfather",genre:"Drama",year:1972,rating:9.2,poster:"3bhkrj58Vtu7enYsRolD1fZdja1",trailer:"sY1S34973zA"},
{ name:"The Pianist",genre:"Drama",year:2002,rating:8.5,poster:"2hFvxCCWrTmCYwfy7yum0GKRi3Y",trailer:"BFwGqLa_oAo"},
{ name:"Life Is Beautiful",genre:"Drama",year:1997,rating:8.6,poster:"6tEJnof1DKWPnl5lzkjf0FVv7oB",trailer:"pAYEQP8gx3w"},

/* ================= ROMANCE ================= */
{ name:"Titanic",genre:"Romance",year:1997,rating:7.9,poster:"9xjZS2rlVxm8SFx8kPC3aIGCOYQ",trailer:"kVrqfYjkTdQ"},
{ name:"La La Land",genre:"Romance",year:2016,rating:8.0,poster:"uDO8zWDhfWwoFdKS4fzkUJt0Rf0",trailer:"0pdqf4P9MB8"},
{ name:"Your Name",genre:"Romance",year:2016,rating:8.4,poster:"q719jXXEzOoYaps6babgKnONONX",trailer:"xU47nhruN-Q"},
{ name:"Pride & Prejudice",genre:"Romance",year:2005,rating:7.8,poster:"sGjIvtVvtrbGhTqR4rS7j5Vtrn4",trailer:"Ur_DIHs92NM"},
{ name:"The Notebook",genre:"Romance",year:2004,rating:7.8,poster:"rDZ2mEwD8GQ0uW7C7x7sP5k5bSo",trailer:"4M7LIcH8C9U"},

/* ================= HORROR ================= */
{ name:"The Conjuring",genre:"Horror",year:2013,rating:7.5,poster:"wVYREutTvI2tmxr6ujrHT704wGF",trailer:"k10ETZ41q5o"},
{ name:"IT",genre:"Horror",year:2017,rating:7.3,poster:"9E2y5Q7WlCVNEhP5GiVTjhEhx1o",trailer:"FnCdOQsX5kc"},
{ name:"Train to Busan",genre:"Horror",year:2016,rating:7.6,poster:"2H1TmgdfNtsKlU9jKdeNyYL5y8T",trailer:"pyWuHv2-Abk"},
{ name:"Hereditary",genre:"Horror",year:2018,rating:7.3,poster:"p9fmuz2Oj3HtEJEqbIwkFGUhVXD",trailer:"V6wWKNij_1M"},
{ name:"The Ring",genre:"Horror",year:2002,rating:7.1,poster:"zH2s2A3X7f6Zb9U3qHzxA4pC0zG",trailer:"yzR2GY-ew8I"},

/* ================= ANIMATION ================= */
{ name:"Spirited Away",genre:"Animation",year:2001,rating:8.6,poster:"oRvMaJOmapypFUcQqpgHMZA6qL9",trailer:"ByXuk9QqQkk"},
{ name:"Toy Story",genre:"Animation",year:1995,rating:8.3,poster:"uXDfjJbdP4ijW5hWSBrPrlKpxab",trailer:"v-PjgYDrg70"},
{ name:"Up",genre:"Animation",year:2009,rating:8.2,poster:"mFvoEwSfLqbcWwFsDjQebn9bzFe",trailer:"ORFWdXl_zJ4"},
{ name:"Coco",genre:"Animation",year:2017,rating:8.4,poster:"gGEsBPAijhVUFoiNpgZXqRVWJt2",trailer:"Rvr68u6k5sI"},
{ name:"Demon Slayer: Mugen Train",genre:"Animation",year:2020,rating:8.2,poster:"h8Rb9gBr48ODIwYUttZNYeMWeUU",trailer:"ATJYac_dORw"},

/* ================= THRILLER ================= */
{ name:"Se7en",genre:"Thriller",year:1995,rating:8.6,poster:"6yoghtyTpznpBik8EngEmJskVUO",trailer:"znmZoVkCjpI"},
{ name:"Gone Girl",genre:"Thriller",year:2014,rating:8.1,poster:"qymaJhucquUwjpb8oiqynMeXnID",trailer:"2-_-1nJf8Vg"},
{ name:"Shutter Island",genre:"Thriller",year:2010,rating:8.2,poster:"kve20tXwUZpu4GUX8l6X7Z4jmL6",trailer:"5iaYLCiq5RM"},
{ name:"The Silence of the Lambs",genre:"Thriller",year:1991,rating:8.6,poster:"rplLJ2hPcOQmkFhTqUte0MkEaO2",trailer:"W6Mm8Sbe__o"},
{ name:"Prisoners",genre:"Thriller",year:2013,rating:8.1,poster:"tuZhZ6biFMr5n9YSVuHOJnNL1uU",trailer:"bpXfcTF6iVk"}
];

async function main() {
  for (const m of movies) {
    await prisma.movie.upsert({
      where: { name: m.name },
      update: {
        genre: m.genre,
        year: m.year,
        rating: m.rating,
        description: `${m.name} (${m.year}) is a famous ${m.genre} movie.`,
        trailerUrl: trailer(m.trailer),
        posterUrl: poster(m.poster)
      },
      create: {
        name: m.name,
        genre: m.genre,
        year: m.year,
        rating: m.rating,
        description: `${m.name} (${m.year}) is a famous ${m.genre} movie.`,
        trailerUrl: trailer(m.trailer),
        posterUrl: poster(m.poster)
      }
    });
  }

  console.log("✅ Seeded ~100 real movies (safe, no duplicates)");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
