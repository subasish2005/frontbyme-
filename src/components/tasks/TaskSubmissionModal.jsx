import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaUpload, FaLink } from 'react-icons/fa';
import styles from './Modal.module.css';

const TaskSubmissionModal = ({ task, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    description: '',
    link: '',
    file: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, file }));
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className={styles.modalOverlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className={styles.modal}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          <div className={styles.modalHeader}>
            <h2>Submit Task: {task.title}</h2>
            <button className={styles.closeButton} onClick={onClose}>
              <FaTimes />
            </button>
          </div>

          <div className={styles.modalContent}>
            <form onSubmit={handleSubmit} className={styles.submissionForm}>
              <div className={styles.formGroup}>
                <label htmlFor="description">Description of Your Work</label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what you did and how you completed the task..."
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="link">
                  <FaLink /> Relevant Link (Optional)
                </label>
                <input
                  type="url"
                  id="link"
                  value={formData.link}
                  onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
                  placeholder="https://..."
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="file" className={styles.fileLabel}>
                  <FaUpload /> Upload File (Optional)
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={handleFileChange}
                  className={styles.fileInput}
                />
                {formData.file && (
                  <div className={styles.filePreview}>
                    Selected file: {formData.file.name}
                  </div>
                )}
              </div>

              <div className={styles.submissionFooter}>
                <button type="button" className={styles.cancelButton} onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className={styles.submitButton}>
                  Submit Task
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TaskSubmissionModal;
