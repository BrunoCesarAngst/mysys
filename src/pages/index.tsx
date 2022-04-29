import { getSession, signIn } from 'next-auth/react'

export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (session) {
    return {
      redirect: {
        destination: '/app',
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}

export default function Signin() {
  return (
    <div className="relative py-16 bg-gradient-to-br from-sky-50 to-gray-200">
      <div className="relative container m-auto px-6 text-gray-500 md:px-12 xl:px-40">
        <div className="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
          <div className="rounded-xl bg-white shadow-xl">
            <div className="p-6 sm:p-16">
              <div className="space-y-4">
                <img
                  src="https://tailus.io/sources/blocks/social/preview/images/icon.svg"
                  loading="lazy"
                  className="w-10"
                  alt="tailus logo"
                />
                <h2 className="mb-8 text-2xl text-cyan-900 font-bold">
                  Faça o login para desbloquear <br /> o melhor do Mysys.
                </h2>
              </div>
              <div className="mt-16 grid space-y-4">
                <button
                  type="button"
                  onClick={() => signIn('auth0')}
                  className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
                >
                  <div className="relative flex items-center space-x-4 justify-center">
                    <img
                      src="https://tailus.io/sources/blocks/social/preview/images/google.svg"
                      className="absolute left-0 w-5"
                      alt="google logo"
                    />
                    <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                      Continue with Google
                    </span>
                  </div>
                </button>
              </div>

              <div className="mt-20 space-y-4 text-gray-600 text-center sm:-mb-8">
                <p className="text-xs">
                  By proceeding, you agree to our{' '}
                  <a href="#" className="underline">
                    Terms of Use
                  </a>{' '}
                  and confirm you have read our{' '}
                  <a href="#" className="underline">
                    Privacy and Cookie Statement
                  </a>
                  .
                </p>
                <p className="text-xs">
                  This site is protected by reCAPTCHA and the{' '}
                  <a href="#" className="underline">
                    Google Privacy Policy
                  </a>{' '}
                  and{' '}
                  <a href="#" className="underline">
                    Terms of Service
                  </a>{' '}
                  apply.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
