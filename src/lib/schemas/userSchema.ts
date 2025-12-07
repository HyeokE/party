import { z } from 'zod'

export const userDataSchema = z.object({
  name: z.string()
    .min(2, '이름은 최소 2자 이상이어야 합니다')
    .max(50, '이름은 50자를 초과할 수 없습니다'),

  phone: z.string()
    .regex(/^010-\d{4}-\d{4}$/, '전화번호는 010-xxxx-xxxx 형식이어야 합니다'),

  email: z
    .email('올바른 이메일 형식이 아닙니다')
})

export type UserDataFormValues = z.infer<typeof userDataSchema>
