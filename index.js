app.get('/tools', (req, res) => {
  res.json({
    tools: [
      {
        name: 'createEvent',
        description: 'Crea una nueva cita en Google Calendar.',
        input_schema: {
          type: 'object',
          properties: {
            nombre: { type: 'string' },
            email: { type: 'string' },
            telefono: { type: 'string' },
            servicio: { type: 'string' },
            start: { type: 'string' },
            end: { type: 'string' }
          },
          required: ['nombre', 'email', 'telefono', 'servicio', 'start', 'end']
        }
      }
    ]
  });
});
