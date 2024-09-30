import React, { useState } from 'react';

const PasswordReset = () => {
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [step, setStep] = useState(1);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
    
        if (step === 1) {
          try {
            const response = await fetch('http://localhost:3005/api/auth/verifyUser', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ Email: email, OldPassword: oldPassword }),
            });
            if (response.ok) {
              setSuccess('Credentials verified. Please enter your new password.');
              setStep(2);
            } else {
              const data = await response.json();
              setError(data.message || 'Verification failed. Please try again.');
            }
          } catch (err) {
            setError('An error occurred. Please try again.');
          }
        } else if (step === 2) {
          try {
            const response = await fetch('http://localhost:3005/api/auth/updatePassword', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ Email: email, NewPassword: newPassword }),
            });
            if (response.ok) {
              setSuccess('Password updated successfully.');
            } else {
              const data = await response.json();
              setError(data.message || 'Password update failed. Please try again.');
            }
          } catch (err) {
            setError('An error occurred. Please try again.');
          }
        }
      };    

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex p-4 border-b justify-between items-center px-16">
        <h1 className="text-2xl font-bold">Structify</h1>
        <a href="/login" className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100">Log in</a>
      </header>
      
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-semibold text-center mb-6">
            {step === 1 ? 'Reset your password' : 'Enter new password'}
          </h2>
          
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && <p className="text-green-500 text-center mb-4">{success}</p>}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 && (
              <>
                <div>
                  <input
                    type="email"
                    placeholder="E-mail address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Old password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              </>
            )}
            
            {step === 2 && (
              <div>
                <input
                  type="password"
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-black text-white p-2 rounded font-semibold"
            >
              {step === 1 ? 'Verify' : 'Reset password'}
            </button>
          </form>
          
          <p className="text-center text-gray-600 mt-4">
            If you have any trouble resetting your password,<br />
            contact us at <a href="mailto:support@structify.org" className="text-blue-600">support@structify.org</a>.
          </p>
        </div>
      </main>

      
      <footer className="p-4 border-t">
        <nav className="flex justify-center space-x-4 text-sm text-gray-600">
          <a href="/">About</a>
          <a href="/">Help</a>
          <a href="/">Terms</a>
          <a href="/">Privacy</a>
          
        </nav>
        <p className="text-center text-sm text-gray-600 mt-2">© Structify 2024</p>
      </footer>
    </div>
  );
};

export default PasswordReset;