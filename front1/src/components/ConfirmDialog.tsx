import Button from 'components/Button'

export function ConfirmDialog({
  children,
  onClose,
  title,
  message,
  onConfirm,
  confirmLabel,
}: {
  children?: React.ReactNode
  onClose: () => void
  title: string
  message: string
  onConfirm: () => void
  confirmLabel: string
}) {
  return (
    <div className='fixed inset-0' onClick={onClose}>
      <div
        className='fixed inset-0 top-16 sm:justify-center sm:inset-40 sm:border-2 p-4 sm:max-h-80 sm:h-auto sm:p-8 overflow-y-auto flex flex-col gap-4 bg-white shadow-sm'
        style={{ zIndex: 200 }}
      >
        <div className='flex flex-col gap-8'>
          <div className='text-l'>{title}</div>
          <div className='text-sm'>{message}</div>

          <div className='flex justify-between gap-8 sm:gap-20 md:w-'>
            <Button onClick={onClose}>Peruuta</Button>
            <Button onClick={onConfirm}>{confirmLabel}</Button>
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}
