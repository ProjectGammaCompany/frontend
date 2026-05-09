import {
  Html5QrcodeScanner,
  type QrcodeErrorCallback,
  type QrcodeSuccessCallback,
} from "html5-qrcode";
import type { Html5QrcodeScannerConfig } from "html5-qrcode/esm/html5-qrcode-scanner";
import { useEffect } from "react";

const qrcodeRegionId = "html5qr-code-full-region";

interface Html5QrCodePluginProps {
  verbose: boolean;
  config?: Html5QrcodeScannerConfig;
  onQrCodeSuccess: QrcodeSuccessCallback;
  onQrCodeError: QrcodeErrorCallback;
}

export const Html5QrcodePlugin = ({
  verbose,
  onQrCodeSuccess,
  onQrCodeError,
  config,
}: Html5QrCodePluginProps) => {
  useEffect(() => {
    const QrCodeScanner = new Html5QrcodeScanner(
      qrcodeRegionId,
      config,
      verbose,
    );
    QrCodeScanner.render(onQrCodeSuccess, onQrCodeError);

    return () => {
      QrCodeScanner.clear().catch((error) => {
        console.error("Failed to clear html5QrcodeScanner. ", error);
      });
    };
  }, []);

  return <div id={qrcodeRegionId} />;
};
