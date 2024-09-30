'use client';
import { useRouter } from 'next/router';
import DashboardLayout from '@/layouts/DashboardLayout';
// import CertifcateUploadBox from '@/components/CertificateUploadBox';
// import ComingSoon from '@/components/ComingSoon';
import dynamic from 'next/dynamic';

const CertifcateUploadBox = dynamic(() => import('@/components/CertificateUploadBox'), {
  ssr: false,
});

export default function MyCertificates() {
  const router = useRouter();
  const { orgId } = router.query;
  return (
    <DashboardLayout pageTitle="My Certificates" previousPage={`/${orgId}`}>
      {/* <ComingSoon /> */}
      <CertifcateUploadBox />
    </DashboardLayout>
  );
}

// export default MyCertificates;
