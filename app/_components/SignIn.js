function SignIn({ action, provider }) {
  return (
    <form action={action}>
      <button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium">
        <img
          src={`https://authjs.dev/img/providers/${provider.toLowerCase()}.svg`}
          alt={`${provider} Logo`}
          height="24"
          width="24"
        />
        <span>Continue with {provider}</span>
      </button>
    </form>
  );
}

export default SignIn;
