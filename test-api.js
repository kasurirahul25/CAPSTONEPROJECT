// Using built-in fetch in Node.js 18+

async function testAPI() {
  try {
    console.log('Testing API endpoint...');
    const response = await fetch('http://localhost:4000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: 'I have a fever' })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('SUCCESS:');
    console.log(JSON.stringify(data, null, 2));
  } catch (error) {
    console.log('ERROR:');
    console.log(error.message);
  }
}

testAPI();
