// utils/authUtils.ts
export function extractUserInfoFromEmail(email: string) {
  if (!email.endsWith('@nitc.ac.in')) return null;

  const [firstPart] = email.split('@');
  const parts = firstPart.split('_');
  if (parts.length < 2) return null;

  const rollNumber = parts[1];
  // Roll number format: XYYNNNNBB
  // X: B (BTech), M (MTech), P (PhD)
  // BB: department code (CS, ME, EE, EC, etc.)
  const programme = rollNumber[0].toUpperCase() === 'B' ? 'BTech' :
                    rollNumber[0].toUpperCase() === 'M' ? 'MTech' :
                    rollNumber[0].toUpperCase() === 'P' ? 'PhD' : '';
  const deptCode = rollNumber.slice(-2).toUpperCase();
  const department = {
    'CS': 'Computer Science',
    'ME': 'Mechanical Engineering',
    'EE': 'Electrical Engineering',
    'EC': 'Electronics and Communication Engineering',
    // Add more as needed
  }[deptCode] || deptCode;

  return {
    rollNumber,
    programme,
    department,
  };
}


