import { type UserData } from '../context/UserDataContext'

interface StoredSubmission {
  email: string
  phone: string
  name: string
  type: 'join' | 'interest'
  timestamp: string
}

const STORAGE_KEY = 'party_submissions'

export function getStoredSubmissions(): StoredSubmission[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Failed to read from localStorage:', error)
    return []
  }
}

export function findExistingSubmission(
  email: string,
  phone: string
): StoredSubmission | null {
  const submissions = getStoredSubmissions()
  return submissions.find(
    (sub) => sub.email === email || sub.phone === phone
  ) || null
}

export function saveSubmission(
  userData: UserData,
  type: 'join' | 'interest'
): void {
  try {
    const submissions = getStoredSubmissions()

    // Remove any existing submission with same email or phone
    const filtered = submissions.filter(
      (sub) => sub.email !== userData.email && sub.phone !== userData.phone
    )

    // Add new submission
    filtered.push({
      ...userData,
      type,
      timestamp: new Date().toISOString()
    })

    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
  } catch (error) {
    console.error('Failed to save to localStorage:', error)
  }
}

export function updateSubmissionType(
  email: string,
  phone: string,
  newType: 'join' | 'interest'
): void {
  try {
    const submissions = getStoredSubmissions()
    const updated = submissions.map((sub) => {
      if (sub.email === email || sub.phone === phone) {
        return { ...sub, type: newType, timestamp: new Date().toISOString() }
      }
      return sub
    })
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch (error) {
    console.error('Failed to update localStorage:', error)
  }
}
