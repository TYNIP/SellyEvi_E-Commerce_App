async function handleGoogleLogin(googleData) {
    try {
      const data = await authService.googleLogin(googleData.code);
      toast.success("Login successful 🔓");

      setUserState(data);
      setRedirectToReferrer(true);
      setIsGoogleLoading(false);
    } catch (error) {
      setIsGoogleLoading(false);
      toast.error("Could not login with Google 😢");
    }
  }