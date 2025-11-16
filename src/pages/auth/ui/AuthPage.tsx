export const AuthPage = () => {
  return (
    <div>
      <h1>Страница авторизации</h1>
      <h2>{import.meta.env.VITE_APP_BASE_URL}</h2>
      <button
        onClick={() => {
          console.log("Вход");
        }}
      >
        Вход
      </button>
    </div>
  );
};
