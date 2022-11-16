import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="px-4 py-4 dark:bg-gray-800 dark:text-gray-400 shadow-inner">
      <div className="container flex flex-wrap items-center justify-center mx-auto space-y-4 sm:justify-between sm:space-y-0">
        <div className="flex flex-row pr-3 space-x-4 sm:space-x-8">
          <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full dark:bg-violet-400">
            <Link href="/">
              <Image
                src="/favicon.ico"
                alt="CornerMall"
                width={70}
                height={70}
              />
            </Link>
          </div>
          <ul className="flex flex-wrap items-center space-x-4 sm:space-x-8">
            <li>
              <Link rel="noopener noreferrer" href="/terms-of-use">
                Terms of Use
              </Link>
            </li>
            <li>
              <Link rel="noopener noreferrer" href="/privacy">
                Privacy
              </Link>
            </li>
          </ul>
        </div>
        <ul className="flex flex-wrap pl-3 space-x-4 sm:space-x-8">
          <li>
            <Link rel="noopener noreferrer" href="#">
              Instagram
            </Link>
          </li>
          <li>
            <Link rel="noopener noreferrer" href="#">
              Facebook
            </Link>
          </li>
          <li>
            <Link rel="noopener noreferrer" href="#">
              Twitter
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}
