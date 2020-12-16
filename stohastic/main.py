from PyQt5 import QtWidgets, uic
from PyQt5.QtWidgets import QMainWindow
from PyQt5.QtCore import pyqtSlot
from pyqtgraph import PlotWidget, plot

import PyQt5.QtGui as QtGui
import pyqtgraph as pg 
import sys
import os

import rand
import randomizer
import exporter

a = []

class MainWindow(QMainWindow):

    #конструктор
    def __init__(self, *args, **kwargs):

        super(MainWindow, self).__init__(*args, **kwargs)
        uic.loadUi('main.ui', self)

        self.pushButton.setEnabled(False)
        self.pushButton_2.setEnabled(False)
        self.spinBox.setEnabled(True)

        self.pushButton.clicked.connect(self.goGet)
        self.pushButton_2.clicked.connect(self.doTheMagic)

        self.radioButton.toggled.connect(self.onClicked)
        self.radioButton_2.toggled.connect(self.onClicked)
        self.radioButton_3.toggled.connect(self.onClicked)

        self.spinBox.valueChanged.connect(self.onValueChanged)

    def doTheMagic(self):

        global a
        if self.radioButton.isChecked():
            self.index = int(rand.even(0, self.spinBox.value()))
        if self.radioButton_2.isChecked():
            self.index = int(rand.normal(self.spinBox.value()))
        if self.radioButton_3.isChecked():
            self.index = int(rand.expo(self.spinBox.value()))
        self.label_4.setEnabled(True)
        self.name = a[self.index]
        self.label_4.setText('Победитель:\n' + '#' + str(self.index + 1) + ': ' + self.name)
        exporter.exportToFile(self.name)

    def onClicked(self):

        global a
        if self.spinBox.value() > 0:
            if len(a) > 0: 
                if self.radioButton.isChecked() or self.radioButton_2.isChecked() or self.radioButton_3.isChecked():
                    self.pushButton_2.setEnabled(True)

    def onValueChanged(self):

        if self.spinBox.value() > 0:
            self.pushButton.setEnabled(True)
        else:
            self.pushButton.setEnabled(False)

    def goGet(self):

        global a
        a = randomizer.genList(self.spinBox.value())
        self.model = QtGui.QStandardItemModel()
        self.listView.setModel(self.model)
        for i in a:
            self.item = QtGui.QStandardItem(i)
            self.model.appendRow(self.item)
    

def main():
    #создаем объект класса MainWindow и показываем основное окно
    app = QtWidgets.QApplication(sys.argv)
    main = MainWindow()
    main.show()
    sys.exit(app.exec_())

if __name__ == '__main__':
    main()