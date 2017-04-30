module.exports = [
  {
    _id: Math.round(Math.random() * 1000000),
    text: 'Hello, what would like me to help you with?',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'Developer',
      avatar: 'https://pbs.twimg.com/profile_images/692354435738161152/UAkVM9-p.png'
    },
  },
];
