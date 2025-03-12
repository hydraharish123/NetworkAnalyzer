import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import { useContext, useState, Fragment } from "react";
import { centralitiesContext } from "../../contexts/CentralitiesContext";
import { Dialog, Transition } from "@headlessui/react";
import styles from "./Centralities.module.css";
import { useEffect } from "react";

const StyledCentrality = styled.div`
  text-align: center;
`;

const CentralityList = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px;
`;

function Centralities() {
  const { centralities, loadingCentrality } = useContext(centralitiesContext);
  const [selectedCentrality, setSelectedCentrality] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      setSelectedCentrality(null);
    }
  }, [open]);

  // ✅ Fix: Show Spinner instead of returning nothing
  if (loadingCentrality) return <Spinner />;

  return (
    <StyledCentrality>
      <Heading as="h3">Centrality Measures</Heading>

      <CentralityList>
        {Object.entries(centralities).map(([key]) => (
          <Button
            size="small"
            key={key}
            onClick={() => {
              setSelectedCentrality(key);
              setOpen(true);
            }}
            variation={selectedCentrality === key ? "danger" : "primary"}
          >
            {key}
          </Button>
        ))}
      </CentralityList>

      {/* ✅ Fix: Wrap Dialog in Transition for animations */}
      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className={styles.modalBackdrop}
          onClose={() => {
            setSelectedCentrality(null);
            setOpen(false);
          }}
        >
          {/* Overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-30" />

          {/* Modal Content */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className={styles.modalContent}>
              <div className={styles.header}>
                <button
                  className={styles.closeButton}
                  onClick={() => setOpen(false)}
                >
                  ✖
                </button>
                <Heading as="h2">{selectedCentrality} Centrality</Heading>
              </div>

              {/* ✅ Fix: Safeguard `centralities[selectedCentrality]` */}
              <div>
                {selectedCentrality && centralities[selectedCentrality] ? (
                  Object.entries(centralities[selectedCentrality]).map(
                    ([key, value]) => (
                      <p key={key}>
                        <strong>{key}</strong> : {value}
                      </p>
                    )
                  )
                ) : (
                  <p>No data available</p>
                )}
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </StyledCentrality>
  );
}

export default Centralities;
