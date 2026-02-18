import { Environment } from '../types';

const config: Record<Environment, { label: string; className: string }> = {
  production: {
    label: 'Production',
    className: 'bg-red-50 text-red-600 border border-red-200',
  },
  staging: {
    label: 'Staging',
    className: 'bg-amber-50 text-amber-600 border border-amber-200',
  },
  development: {
    label: 'Development',
    className: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
  },
};

interface Props {
  environment: Environment;
}

export const EnvironmentBadge = ({ environment }: Props) => {
  const { label, className } = config[environment];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {label}
    </span>
  );
};
