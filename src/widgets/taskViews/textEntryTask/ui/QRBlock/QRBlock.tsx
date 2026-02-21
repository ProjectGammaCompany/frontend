import { QrCodeScanner } from "@/src/shared/lib";
import { Button, Input, Typography } from "antd";
import type { Html5QrcodeScannerConfig } from "html5-qrcode/esm/html5-qrcode-scanner";
import { useState } from "react";

interface QRBlockProps {
  answer: string[];
  onSuccessScanning: (decodedText: string) => void;
  setAnswer: (answer: string[]) => void;
  inputMode: "qr" | "text";
  setInputMode: (type: "qr" | "text") => void;
  disabled: boolean;
}

const QRInputBlock = ({
  answer,
  setAnswer,
  disabled,
  setInputMode,
  inputMode,
  onSuccessScanning,
}: QRBlockProps) => {
  const [cameraOpen, setCameraOpen] = useState(false);

  const hintTextMap: Record<"text" | "qr", string> = {
    text: "Введите последовательность символов, составляющую QR-код",
    qr: "Отсканируйте QR-код:",
  };

  const changeInputTextMap: Record<"text" | "qr", string> = {
    qr: "Нет возможности использовать камеру",
    text: "Вернуться к вводу QR-кода",
  };

  const handleSuccessScanning = (decodedText: string) => {
    onSuccessScanning(decodedText);
  };

  const handleErrorScanning = () => {
    setCameraOpen(false);
  };

  const qrCodeScannerConfig: Html5QrcodeScannerConfig = {
    fps: 10,
  };

  return (
    <>
      <Typography.Paragraph>{hintTextMap[inputMode]}</Typography.Paragraph>
      {inputMode === "qr" ? (
        <div>
          <Button disabled={disabled} onClick={() => setCameraOpen(true)}>
            Открыть камеру
          </Button>
          <QrCodeScanner
            open={cameraOpen}
            setIsOpen={setCameraOpen}
            elementId="qrTask"
            onQrCodeScanningSuccess={handleSuccessScanning}
            onQrCodeScanningError={handleErrorScanning}
            config={qrCodeScannerConfig}
            verbose
          />
        </div>
      ) : (
        <div>
          <Input
            disabled={disabled}
            value={answer[0]}
            onChange={(e) => setAnswer([e.currentTarget.value])}
          />
        </div>
      )}
      <Typography.Paragraph
        onClick={() => {
          if (disabled) return;
          setInputMode(inputMode === "text" ? "qr" : "text");
        }}
      >
        {changeInputTextMap[inputMode]}
      </Typography.Paragraph>
    </>
  );
};

export default QRInputBlock;
