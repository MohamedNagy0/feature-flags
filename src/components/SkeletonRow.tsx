const SkeletonCell = ({ width = 'w-full' }: { width?: string }) => (
  <div
    className={`h-4 ${width} rounded bg-gradient-to-r from-[#e8e8e8] via-[#f4f4f4] to-[#e8e8e8] bg-[length:200%_100%] animate-shimmer`}
  />
);

export const SkeletonRow = () => (
  <tr className="border-b border-[#f4f4f4]">
    <td className="px-6 py-4"><SkeletonCell width="w-36" /></td>
    <td className="px-6 py-4"><SkeletonCell width="w-24" /></td>
    <td className="px-6 py-4"><SkeletonCell width="w-20" /></td>
    <td className="px-6 py-4"><SkeletonCell width="w-28" /></td>
    <td className="px-6 py-4 flex justify-center"><SkeletonCell width="w-12" /></td>
  </tr>
);
