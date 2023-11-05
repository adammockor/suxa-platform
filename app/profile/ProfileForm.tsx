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
      <div className="w-full lg:w-auto max-w-3xl m-auto flex flex-col lg:flex-row items-center lg:justify-end gap-4">
        {submitButton}
      </div>
    </form>
  );
}

export default ProfileForm;


