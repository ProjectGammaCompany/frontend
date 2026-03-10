import { Button, Typography } from "antd";
import classnames from "classnames";
import {
  Html5Qrcode,
  type Html5QrcodeResult,
  type QrcodeErrorCallback,
  type QrcodeSuccessCallback,
} from "html5-qrcode";
import type { Html5QrcodeError } from "html5-qrcode/esm/core";
import type { Html5QrcodeScannerConfig } from "html5-qrcode/esm/html5-qrcode-scanner";
import { useCallback, useEffect, useState } from "react";
import { CrossSvg } from "../../ui";
import "./QrCodeScanner.scss";
interface QrCodeScannerProps {
  elementId: string;
  open: boolean;
  setIsOpen: (open: boolean) => void;
  verbose?: boolean;
  config?: Html5QrcodeScannerConfig;
  onQrCodeScanningSuccess: QrcodeSuccessCallback;
  onQrCodeScanningError: QrcodeErrorCallback;
}

export const QrCodeScanner = ({
  open,
  setIsOpen,
  elementId,
  onQrCodeScanningSuccess,
  onQrCodeScanningError,
  config,
}: QrCodeScannerProps) => {
  const [scanner, setScanner] = useState<undefined | Html5Qrcode>();
  const [scanningStarted, setScanningStarted] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSuccessScanning: QrcodeSuccessCallback = useCallback(
    (decodedText: string, result: Html5QrcodeResult) => {
      onQrCodeScanningSuccess(decodedText, result);
      setIsOpen(false);
    },
    [onQrCodeScanningSuccess, setIsOpen],
  );

  const handleErrorScanning = useCallback(
    (errorMessage: string, error: Html5QrcodeError) => {
      if (
        !errorMessage.includes(
          "No MultiFormat Readers were able to detect the code",
        ) &&
        !errorMessage.includes("No barcode or QR code detected")
      ) {
        console.error(`Error in scanning: ${errorMessage}`);
        onQrCodeScanningError(errorMessage, error);
      }
    },
    [onQrCodeScanningError],
  );

  const classNames = classnames([
    "qr-code-scanner",
    {
      "qr-code-scanner_open": open,
    },
  ]);

  useEffect(() => {
    setScanner(new Html5Qrcode(elementId));
    return () => {
      setScanner(undefined);
    };
  }, [elementId]);

  useEffect(() => {
    if (scanner && open && !scanningStarted) {
      setLoading(true);
      void scanner
        .start(
          { facingMode: "user" },
          config,
          handleSuccessScanning,
          handleErrorScanning,
        )
        .then(() => {
          setScanningStarted(true);
          setLoading(false);
        });
    }
  }, [
    config,
    handleErrorScanning,
    handleSuccessScanning,
    open,
    scanner,
    scanningStarted,
  ]);

  useEffect(() => {
    if (scanner && !open && scanningStarted) {
      void scanner.stop().then(() => setScanningStarted(false));
    }
  });

  return (
    <div className={classNames}>
      <div>
        <div id={elementId} className="qr-code-scanner-wrapper">
          {loading && <Typography>Загрузка...</Typography>}
          {scanningStarted && (
            <Button
              onClick={() => setIsOpen(false)}
              className="qr-code-scanner__close-btn"
              icon={<CrossSvg />}
            />
          )}
        </div>
      </div>
    </div>
  );
};
