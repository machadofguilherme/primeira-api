const express = require('express');

const app = express();
const teamId = '/teams/:id';

app.use(express.json());

const teams = [
  {
    id: 1,
    name: 'São Paulo Futebol Clube',
    initials: 'SPF',
  },
  {
    id: 2,
    name: 'Clube Atlético Mineiro',
    initials: 'CAM',
  },
];

// Primeira rota.
app.get('/', (req, res) => res.json(
  {
    message: 'Olá, mundo!',
  },
));

// Rota teams.
app.get('/teams', (req, res) => res.status(200).json({
  teams,
}));

// Adicionando um time.
app.post('/teams', (req, res) => {
  const newTeam = { ...req.body };
  teams.push(newTeam);

  res.status(201).json({ teams: newTeam });
});

// Alterando um time.
app.put(teamId, (req, res) => {
  const { id } = req.params;
  const { name, initials } = req.body;

  const updateTeam = teams.find((team) => team.id === Number(id));

  if (!updateTeam) {
    res.status(404).json({ error: 'Team not found' });
  }

  updateTeam.name = name;
  updateTeam.initials = initials;
  res.status(200).json({ ...req.body, teams: updateTeam });
});

// Listando um time.
app.get(teamId, (req, res) => {
  const { id } = req.params;
  const getTeam = teams.find((team) => team.id === Number(id));

  res.status(200).json({ teams: getTeam });
});

// Deletando um time.
app.delete(teamId, (req, res) => {
  const { id } = req.params;
  const newList = teams.filter((team) => team.id !== Number(id));

  res.status(200).json({ teams: newList });
});

module.exports = app;