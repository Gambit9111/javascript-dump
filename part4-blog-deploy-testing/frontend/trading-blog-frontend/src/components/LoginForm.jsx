function LoginForm({handleLogin, email, setEmail, password, setPassword}) {

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="email"
          value={email}
          name="Email"
          onChange={({ target }) => setEmail(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
}

export default LoginForm;