import { cn } from '@/src/lib/utils'
import { z } from 'zod'

const dependentSchema = z.object({
  stars: z.number(),
  owner: z.string(),
  name: z.string(),
  pkg: z.string(),
  avatarURL: z.string(),
  version: z.string().nullable(),
  createdAt: z.string().transform(date => new Date(date))
})
type Dependent = z.infer<typeof dependentSchema>

export async function fetchDependents() {
  const data = await fetch('https://dependents.47ng.com', {
    next: {
      revalidate: 86_400
    }
  }).then(res => res.json())
  return z.array(dependentSchema).parse(data)
}

export async function DependentsSection() {
  let dependents: Dependent[] = []
  try {
    dependents = await fetchDependents()
  } catch (error) {
    console.error(error)
    return <section className="text-red-500">{String(error)}</section>
  }
  return (
    <section className="container space-y-16">
      <h2 className="text-center text-3xl font-bold tracking-tighter dark:text-white md:text-4xl xl:text-5xl">
        Used by
      </h2>
      <p className="flex flex-wrap justify-center gap-x-16 gap-y-8">
        <a href="https://midday.ai">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 102 30"
            className="inline h-8 fill-black dark:fill-white md:h-10"
            fill="none"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M14.347 0a14.931 14.931 0 0 0-6.282 1.68l6.282 10.88V0Zm0 17.443L8.067 28.32a14.933 14.933 0 0 0 6.28 1.68V17.443ZM15.652 30V17.432l6.285 10.887A14.932 14.932 0 0 1 15.652 30Zm0-17.43V0c2.26.097 4.392.693 6.287 1.682l-6.287 10.889ZM2.336 23.068l10.884-6.284-6.284 10.884a15.093 15.093 0 0 1-4.6-4.6Zm25.33-16.132-10.88 6.282 6.282-10.88a15.094 15.094 0 0 1 4.598 4.598ZM2.335 6.934a15.094 15.094 0 0 1 4.6-4.6l6.284 10.884L2.335 6.934Zm-.654 1.13A14.931 14.931 0 0 0 0 14.35h12.568L1.681 8.064Zm0 13.873a14.932 14.932 0 0 1-1.68-6.282h12.562L1.682 21.938Zm15.754-7.587H30a14.93 14.93 0 0 0-1.68-6.285L17.435 14.35Zm10.884 7.586-10.878-6.28H30a14.932 14.932 0 0 1-1.68 6.28Zm-11.533-5.151 6.281 10.88a15.092 15.092 0 0 0 4.598-4.599l-10.88-6.281Z"
              clipRule="evenodd"
            />
            <path
              fill="currentColor"
              d="M92.34 11.912h1.637l2.995 8.223 2.884-8.223h1.619l-4 11.107c-.372 1.06-1.08 1.544-2.196 1.544h-1.172v-1.358h1.024c.502 0 .8-.186.986-.707l.353-.912h-.52l-3.61-9.674ZM82.744 14.814c.39-1.916 1.916-3.126 4.018-3.126 2.549 0 3.963 1.489 3.963 4.13v3.964c0 .446.186.632.614.632h.39v1.358h-.65c-1.005 0-1.88-.335-1.861-1.544-.428.93-1.544 1.767-3.107 1.767-1.954 0-3.535-1.041-3.535-2.79 0-2.028 1.544-2.55 3.702-2.977l2.921-.558c-.018-1.712-.818-2.53-2.437-2.53-1.265 0-2.102.65-2.4 1.804l-1.618-.13Zm1.432 4.39c0 .8.689 1.452 2.14 1.433 1.637 0 2.92-1.153 2.92-3.442v-.167l-2.362.41c-1.47.26-2.698.371-2.698 1.767ZM80.129 8.563v13.21h-1.377l-.056-1.452c-.558 1.042-1.618 1.675-3.144 1.675-2.847 0-4.168-2.419-4.168-5.154s1.321-5.153 4.168-5.153c1.451 0 2.493.558 3.051 1.562V8.563h1.526Zm-7.145 8.28c0 1.915.819 3.701 2.884 3.701 2.028 0 2.865-1.823 2.865-3.702 0-1.953-.837-3.758-2.865-3.758-2.065 0-2.884 1.786-2.884 3.758ZM68.936 8.563v13.21H67.56l-.056-1.452c-.558 1.042-1.619 1.675-3.144 1.675-2.847 0-4.168-2.419-4.168-5.154s1.321-5.153 4.168-5.153c1.45 0 2.493.558 3.05 1.562V8.563h1.526Zm-7.144 8.28c0 1.915.819 3.701 2.884 3.701 2.028 0 2.865-1.823 2.865-3.702 0-1.953-.837-3.758-2.865-3.758-2.065 0-2.884 1.786-2.884 3.758ZM56.212 11.912h1.525v9.86h-1.525v-9.86Zm-.037-1.544V8.6h1.6v1.768h-1.6ZM40.224 11.912h1.395l.056 1.674c.446-1.21 1.47-1.898 2.846-1.898 1.414 0 2.438.763 2.865 2.084.428-1.34 1.47-2.084 3.014-2.084 1.973 0 3.126 1.377 3.126 3.74v6.344H52v-5.897c0-1.805-.707-2.828-1.916-2.828-1.544 0-2.437 1.041-2.437 2.846v5.88H46.12v-5.899c0-1.767-.725-2.827-1.916-2.827-1.526 0-2.456 1.079-2.456 2.827v5.898h-1.525v-9.86Z"
            />
          </svg>
        </a>
        <a href="https://vercel.com" className="order-last sm:order-none">
          <svg
            aria-label="Vercel"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 284 65"
            className="inline h-8 fill-black dark:fill-white md:h-10"
          >
            <path d="M141.68 16.25c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.46 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zm117.14-14.5c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.45 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zm-39.03 3.5c0 6 3.92 10 10 10 4.12 0 7.21-1.87 8.8-4.92l7.68 4.43c-3.18 5.3-9.14 8.49-16.48 8.49-11.05 0-19-7.2-19-18s7.96-18 19-18c7.34 0 13.29 3.19 16.48 8.49l-7.68 4.43c-1.59-3.05-4.68-4.92-8.8-4.92-6.07 0-10 4-10 10zm82.48-29v46h-9v-46h9zM37.59.25l36.95 64H.64l36.95-64zm92.38 5l-27.71 48-27.71-48h10.39l17.32 30 17.32-30h10.39zm58.91 12v9.69c-1-.29-2.06-.49-3.2-.49-5.81 0-10 4-10 10v14.8h-9v-34h9v9.2c0-5.08 5.91-9.2 13.2-9.2z" />
          </svg>
        </a>
        <a href="https://openpanel.dev" className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 278 278"
            fill="none"
            className="inline h-8 fill-black dark:fill-white md:h-10"
          >
            <rect width="278" height="278" rx="20" fill="#2664EB" />
            <path
              d="M148.959 203H128.873C128.291 203 128 202.698 128 202.095L128.349 74.7242C128.349 74.2414 128.582 74 129.048 74H163.456C174.402 74 183.048 77.4702 189.394 84.4105C195.798 91.2905 199 100.675 199 112.564C199 121.255 197.341 128.829 194.022 135.286C190.645 141.684 186.279 146.632 180.923 150.133C175.566 153.633 169.744 155.383 163.456 155.383H149.833V202.095C149.833 202.698 149.542 203 148.959 203ZM163.456 95.9979L149.833 96.179V132.933H163.456C167.241 132.933 170.53 131.062 173.325 127.32C176.119 123.518 177.517 118.599 177.517 112.564C177.517 107.736 176.265 103.783 173.761 100.705C171.258 97.567 167.823 95.9979 163.456 95.9979Z"
              fill="white"
              fillOpacity="0.9"
            />
            <path
              d="M114.47 203C108.074 203 102.177 201.36 96.7791 198.079C91.4395 194.798 87.1267 190.434 83.8408 184.986C80.6136 179.479 79 173.445 79 166.884L79.176 109.853C79.176 103.174 80.7896 97.1696 84.0169 91.8386C87.1854 86.4489 91.4688 82.143 96.8671 78.921C102.265 75.6403 108.133 74 114.47 74C121.042 74 126.939 75.611 132.161 78.8331C137.442 82.0552 141.667 86.3903 144.835 91.8386C148.063 97.2282 149.676 103.233 149.676 109.853L149.852 166.884C149.852 173.445 148.268 179.45 145.099 184.898C141.872 190.405 137.589 194.798 132.249 198.079C126.91 201.36 120.983 203 114.47 203ZM114.47 181.295C118.108 181.295 121.277 179.83 123.976 176.901C126.675 173.913 128.025 170.574 128.025 166.884L127.848 109.853C127.848 105.869 126.587 102.501 124.064 99.7473C121.541 96.9939 118.343 95.6172 114.47 95.6172C110.774 95.6172 107.605 96.9646 104.965 99.6594C102.324 102.354 101.004 105.752 101.004 109.853V166.884C101.004 170.809 102.324 174.206 104.965 177.077C107.605 179.889 110.774 181.295 114.47 181.295Z"
              fill="white"
              fillOpacity="0.9"
            />
          </svg>
          <span className="text-lg font-medium">openpanel.dev</span>
        </a>
      </p>
      <div className="flex flex-wrap justify-center gap-1.5">
        {dependents.map(dep => (
          <a
            key={dep.owner + dep.name}
            href={`https://github.com/${dep.owner}/${dep.name}`}
            className="relative h-8 w-8 rounded-full"
          >
            <img
              src={upscaleGitHubAvatar(dep.avatarURL, 64)}
              alt={dep.owner + '/' + dep.name}
              className="rounded-full"
              loading="lazy"
              width={64}
              height={64}
            />
            <span
              className={cn(
                'absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-background',
                dep.pkg === 'nuqs' ? 'bg-green-500' : 'bg-zinc-500'
              )}
              aria-label={`Using ${dep.pkg}`}
            />
          </a>
        ))}
      </div>
    </section>
  )
}

function upscaleGitHubAvatar(originalURL: string, size: number) {
  const url = new URL(originalURL)
  url.searchParams.set('s', size.toFixed())
  return url.toString()
}
