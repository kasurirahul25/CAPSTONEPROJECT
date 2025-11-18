// Backend API Testing Script
const testAPI = async () => {
  const baseURL = 'http://localhost:4000'
  
  console.log('🧪 Testing PRESCRIPTO Backend API Endpoints\n')
  
  // Test 1: Basic server health
  try {
    console.log('1️⃣ Testing basic server health...')
    const response = await fetch(`${baseURL}/`)
    const data = await response.text()
    console.log('✅ Server Response:', data)
  } catch (error) {
    console.log('❌ Server Health Test Failed:', error.message)
    return
  }
  
  // Test 2: User Registration
  try {
    console.log('\n2️⃣ Testing user registration...')
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      phone: '1234567890'
    }
    
    const response = await fetch(`${baseURL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    })
    
    const data = await response.json()
    console.log('✅ Registration Response:', data.success ? 'SUCCESS' : 'FAILED')
    console.log('   Message:', data.message)
    
    if (data.success) {
      global.testToken = data.token
      global.testUser = data.user
    }
  } catch (error) {
    console.log('❌ Registration Test Failed:', error.message)
  }
  
  // Test 3: User Login
  try {
    console.log('\n3️⃣ Testing user login...')
    const loginData = {
      identifier: 'test@example.com',
      password: 'password123'
    }
    
    const response = await fetch(`${baseURL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData)
    })
    
    const data = await response.json()
    console.log('✅ Login Response:', data.success ? 'SUCCESS' : 'FAILED')
    console.log('   Message:', data.message)
    
    if (data.success) {
      global.testToken = data.token
      global.testUser = data.user
    }
  } catch (error) {
    console.log('❌ Login Test Failed:', error.message)
  }
  
  // Test 4: Chatbot API
  try {
    console.log('\n4️⃣ Testing chatbot API...')
    const chatData = {
      question: 'I have a fever'
    }
    
    const response = await fetch(`${baseURL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(chatData)
    })
    
    const data = await response.json()
    console.log('✅ Chatbot Response:', data.success !== false ? 'SUCCESS' : 'FAILED')
    console.log('   Answer:', data.answer?.substring(0, 100) + '...')
    if (data.medicationSuggestions) {
      console.log('   Medication Suggestions:', data.medicationSuggestions.length)
    }
  } catch (error) {
    console.log('❌ Chatbot Test Failed:', error.message)
  }
  
  // Test 5: Get All Doctors
  try {
    console.log('\n5️⃣ Testing get all doctors...')
    const response = await fetch(`${baseURL}/api/doctors`)
    const data = await response.json()
    console.log('✅ Doctors Response:', data.success ? 'SUCCESS' : 'FAILED')
    console.log('   Doctor Count:', data.doctors?.length || 0)
  } catch (error) {
    console.log('❌ Doctors Test Failed:', error.message)
  }
  
  // Test 6: Doctor Registration (if we have a token)
  if (global.testToken) {
    try {
      console.log('\n6️⃣ Testing doctor registration...')
      const doctorData = {
        name: 'Dr. Test Doctor',
        email: 'doctor@example.com',
        password: 'password123',
        speciality: 'General Medicine',
        degree: 'MBBS',
        experience: '5 years',
        about: 'Experienced general practitioner',
        fees: 500,
        address: {
          line1: '123 Medical Street',
          line2: 'Health City'
        }
      }
      
      const response = await fetch(`${baseURL}/api/doctors/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(doctorData)
      })
      
      const data = await response.json()
      console.log('✅ Doctor Registration Response:', data.success ? 'SUCCESS' : 'FAILED')
      console.log('   Message:', data.message)
    } catch (error) {
      console.log('❌ Doctor Registration Test Failed:', error.message)
    }
  }
  
  console.log('\n🎉 API Testing Complete!')
}

// Run the tests
testAPI().catch(console.error)





