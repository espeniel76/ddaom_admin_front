<script>
  import { postApi } from '../service/api';

  let formUserId = null;
  let formPassword = null;

  const resetValues = () => {
    formUserId.value = '';
    formPassword.value = '';
    formUserId.focus();
  };
  const onKeyPress = (e) => {
    if (e.charCode === 13) onLogin();
  };

  async function onLogin() {
    if (formUserId.value.length < 1) {
      alert('아이디를 입력 하세요.');
      formUserId.focus();
      return false;
    }

    if (formPassword.value.length < 1) {
      alert('비밀번호를 입력 하세요.');
      formPassword.focus();
      return false;
    }

    let data = { UserId: formUserId.value, Password: formPassword.value };
    let result = await postApi('/auth/login', data);
    switch (result.ResultCode) {
      case 'NO_EXIST_DATA':
        alert('존재하지 않는 관리자 입니다.');
        resetValues();
        break;
      case 'OK':
        sessionStorage.setItem('AccessToken', result.Data.AccessToken);
        sessionStorage.setItem('RefershToken', result.Data.RefershToken);
        resetValues();
        self.location.href = '/';
        break;
    }
  }
</script>

<div class="container-xxl">
  <div class="authentication-wrapper authentication-basic container-p-y">
    <div class="authentication-inner">
      <div class="card">
        <div class="card-body">
          <div class="app-brand justify-content-center">
            <a href="index.html" class="app-brand-link gap-2">
              <img alt="" src="/assets/img/logo.png" width="50" />
              <span class="app-brand-text demo text-body fw-bolder"
                >따옴 관리자</span
              >
            </a>
          </div>

          <br /><br />
          <p class="mb-4">계정 아이디와 비밀번호를 입력 후 시작하세요.</p>

          <div class="mb-3">
            <label for="UserId" class="form-label">관리자아이디</label>
            <input
              type="text"
              class="form-control"
              placeholder="관리자아이디"
              on:keypress={onKeyPress}
              bind:this={formUserId}
            />
          </div>
          <div class="mb-3 form-password-toggle">
            <div class="d-flex justify-content-between">
              <label class="form-label" for="password">Password</label>
            </div>
            <div class="input-group input-group-merge">
              <input
                on:keypress={onKeyPress}
                type="password"
                class="form-control"
                placeholder="패스워드"
                bind:this={formPassword}
              />
              <span class="input-group-text cursor-pointer"
                ><i class="bx bx-hide" /></span
              >
            </div>
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="remember-me"
              />
              <label class="form-check-label" for="remember-me">
                Remember Me
              </label>
            </div>
          </div>
          <div class="mb-3">
            <button
              class="btn btn-primary d-grid w-100"
              type="button"
              on:click={onLogin}>Sign in</button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
