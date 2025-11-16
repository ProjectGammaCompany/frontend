export const AuthPage = () => {
  return (
    <div>
      <h1>Страница авторизации</h1>
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
