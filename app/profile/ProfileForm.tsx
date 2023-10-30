'use client';

function ProfileForm({
  action,
  submitButton,
  children
}: {
  action: (formData: FormData) => void;
  submitButton: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <form id="profile" action={action} className="">
      {children}
      <div className="w-full max-w-3xl m-auto my-8 flex items-center justify-end gap-4">
        {submitButton}
      </div>
    </form>
  );
}

export default ProfileForm;


