'use client'
import { Link } from '@chakra-ui/next-js'

export default function Home() {
  return (
    <>
      <Link href='/login' color='blue.400' _hover={{ color: 'blue.500' }}>
        Login
      </Link>
    </>
  );
}
