describe('chatbot test', () => {
  test('chatbot asks for correct questions', () => {
    const conversation = [];
    const question = 'report';
    const followUp = [
      ['how will you want to report']
    ];

    processAnswer(question, conversation);

    expect(conversation).toEqual(followUp);
  });
});