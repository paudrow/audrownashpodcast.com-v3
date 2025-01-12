import Image from "next/image";
import Link from "next/link";
import { SOCIAL_LINKS } from "./constants";

export default function Home() {
  return (
    <>
      <header>
        <title>Audrow Nash Podcast</title>
      </header>

      <div className="min-h-screen bg-white font-sans text-gray-800">
        <div className="relative">
          <section className="relative h-[600px] w-full bg-[url('/banner.png')] bg-cover bg-center">
            <Image
              src="/banner.png"
              alt="Banner"
              className="h-full w-full object-cover"
              loading="lazy"
              width={1920}
              height={1080}
            />
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="absolute bottom-0 left-0 right-0">
              <div className="mx-auto max-w-4xl px-4 pb-8">
                <h2 className="text-center text-4xl font-bold text-white sm:text-5xl md:text-5xl">
                  Exploring the frontiers of robotics,
                  <br className="hidden md:inline" /> one conversation at a time
                </h2>
                <div className="mb-6" />
                <p className="text-md text-center text-gray-300 sm:text-base md:text-xl">
                  Subscribe below to never miss an episode.
                </p>
                <div className="mb-8" />
              </div>
            </div>
          </section>
        </div>

        <section className="w-full bg-gray-800 py-8">
          <div className="mx-auto max-w-4xl px-8">
            <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between md:gap-12">
              <SocialLink platform="X" action="Watch" />
              <SocialLink platform="YOUTUBE" action="Watch" />
              <SocialLink platform="SPOTIFY" action="Listen" />
              <SocialLink platform="APPLE_PODCASTS" action="Listen" />
            </div>
          </div>
        </section>

        <section className="px-4 pt-16">
          <SubscribeCta />
        </section>

        <Footer />
      </div>
    </>
  );
}

type SocialLinkProps = {
  platform: keyof typeof SOCIAL_LINKS;
  action: "Watch" | "Listen";
};

function SocialLink({ platform, action }: SocialLinkProps) {
  const { url, displayName, icon } = SOCIAL_LINKS[platform];
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center text-white transition-colors duration-300 hover:text-gray-300"
    >
      {icon && (
        <Image
          src={icon}
          alt={displayName}
          width={48}
          height={48}
          className={`mr-4 h-12 w-12 ${platform === "X" ? "rounded-lg" : ""}`}
        />
      )}
      <div className="flex flex-col items-start">
        <span className="text-sm text-gray-400">{action} on</span>
        <span className="text-xl font-bold">{displayName}</span>
      </div>
    </a>
  );
}

function SubscribeCta() {
  return (
    <div className="mx-auto max-w-4xl border-b-4 border-t-4 border-gray-800 py-16">
      <h3 className="mx-auto max-w-3xl pb-6 text-center text-3xl font-bold sm:text-4xl">
        Don&apos;t miss an insight. Subscribe for episode recaps and
        opportunities.
      </h3>
      <div className="md:pb-4" />
      <div className="flex justify-center">
        <div className="mb-4 flex w-full max-w-lg flex-col gap-4 sm:flex-row sm:gap-0">
          <input
            type="email"
            name="email"
            id="bd-email"
            placeholder="isaac.asimov@foundation.gal"
            className="flex-grow cursor-pointer rounded-full border-2 border-gray-300 px-6 py-3 text-lg focus:border-gray-500 focus:outline-none sm:rounded-r-none"
            aria-label="Enter your email"
          />
          <input
            type="submit"
            value="Subscribe"
            className="cursor-pointer rounded-full bg-gray-800 px-6 py-3 text-lg font-bold text-white sm:rounded-l-none"
          />
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-100 py-16">
      <div className="mx-auto max-w-4xl px-4">
        <div className="grid grid-cols-1 justify-items-center gap-8 text-center md:grid-cols-3 md:text-left">
          <div>
            <h3 className="mb-4 text-lg font-semibold">About</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-gray-600 hover:text-gray-800">
                  About Audrow
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/audrow-nash-podcast/audrownashpodcast.com"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Site Github
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Listen</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/where-to-find"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Where to Find
                </a>
              </li>
              <li>
                <a
                  href="https://podcasters.spotify.com/pod/show/audrow1"
                  className="text-gray-600 hover:text-gray-800"
                >
                  All Episodes
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={SOCIAL_LINKS.X.url}
                  className="text-gray-600 hover:text-gray-800"
                >
                  {SOCIAL_LINKS.X.displayName}
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL_LINKS.LINKEDIN.url}
                  className="text-gray-600 hover:text-gray-800"
                >
                  {SOCIAL_LINKS.LINKEDIN.displayName}
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL_LINKS.YOUTUBE.url}
                  className="text-gray-600 hover:text-gray-800"
                >
                  {SOCIAL_LINKS.YOUTUBE.displayName}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 text-center">
          <p className="text-gray-600">Happily made in San Antonio.</p>
          <p className="mt-2 text-sm text-gray-500">
            © {new Date().getFullYear()} Audrow Nash Podcast. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
